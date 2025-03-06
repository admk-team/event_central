<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role as SpatieRole;
use Spatie\Permission\PermissionRegistrar;
use Spatie\Permission\Contracts\Permission;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;

class Role extends SpatieRole
{
    use HasFactory;

    public function scopeOfOwner(Builder $query): void
    {
        $query->where('panel', 'organizer')
            ->where(function (Builder $query) {
                $query->where('organizer_id', Auth::user()->owner_id)
                ->orWhereNull('organizer_id');
            });
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
