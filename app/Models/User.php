<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Contracts\Permission;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;
use Spatie\Permission\PermissionRegistrar;

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
}
