<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Contracts\Permission;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Spatie\Permission\Models\Permission as ModelsPermission;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'parent_id',
        'name',
        'email',
        'password',
        "role",
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function payment_keys()
    {
        return $this->hasOne(OrganizerPaymentKeys::class, 'user_id');
        // if ($this->hasRole('organizer')) {
        // }
        // return null;
    }

    public function scopeOfOwner(Builder $query): void
    {
        $query->where('role', 'organizer')
            ->where('parent_id', Auth::user()->owner_id);
    }

    public function getOwnerIdAttribute(): int
    {
        if (! is_null($this->parent_id)) {
            return $this->parent_id;
        }

        return $this->id;
    }

    /**
     * Find a permission.
     *
     * @param  string|int|Permission|\BackedEnum  $permission
     * @return Permission
     *
     * @throws PermissionDoesNotExist
     */
    public function filterPermission($permission, $guardName = null)
    {
        if ($permission instanceof \BackedEnum) {
            $permission = $permission->value;
        }

        if (is_int($permission) || PermissionRegistrar::isUid($permission)) {
            // $permission = $this->getPermissionClass()::findById(
            //     $permission,
            //     $guardName ?? $this->getDefaultGuardName()
            // );
            $permission = $this->getPermissionClass()::where('id', $permission)
                ->where('guard_name', $guardName ?? $this->getDefaultGuardName())
                ->where('panel', Auth::user()?->role)
                ->first();
        }

        if (is_string($permission)) {
            // $permission = $this->getPermissionClass()::findByName(
            //     $permission,
            //     $guardName ?? $this->getDefaultGuardName()
            // );
            $permission = $this->getPermissionClass()::where('name', $permission)
                ->where('guard_name', $guardName ?? $this->getDefaultGuardName())
                ->where('panel', Auth::user()?->role)
                ->first();
        }

        if (! $permission instanceof Permission) {
            throw new PermissionDoesNotExist;
        }

        return $permission;
    }

    /**
     * Return all the permissions the model has, both directly and via roles. Also Check
     * for superadmin roles
     */
    public function getAllPermissions(): Collection
    {
        if ($this->hasRole('superadmin')) {
            return ModelsPermission::where('panel', 'admin')->get();
        }

        if ($this->hasRole('owner')) {
            return ModelsPermission::where('panel', 'organizer')->get();
        }

        /** @var Collection $permissions */
        $permissions = $this->permissions;

        if (! is_a($this, Permission::class)) {
            $permissions = $permissions->merge($this->getPermissionsViaRoles());
        }

        //Caching each user permissions with dynamic key
        $permissions = Cache::remember('user_permissions_' . $this->id, now()->addMinutes(5), function () use ($permissions) {
            return $permissions->sort()->values();
        });
    }

    public function accessibleEvents(): MorphToMany
    {
        return $this->morphedByMany(EventApp::class, 'model', 'model_permissions', 'authorizable_id')
            ->where('authorizable_type', User::class);
    }

    public function accessibleEventSessions(): MorphToMany
    {
        return $this->morphedByMany(EventSession::class, 'model', 'model_permissions', 'authorizable_id')
            ->where('authorizable_type', User::class);
    }

    public function fees()
    {
        return $this->hasMany(EventAppFee::class);
    }

    public function attendeePayments()
    {
        return $this->morphMany(AttendeePayment::class, 'payer');
    }
}
