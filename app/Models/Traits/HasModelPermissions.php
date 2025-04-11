<?php

namespace App\Models\Traits;

use App\Models\ModelPermission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasModelPermissions
{
    /**
     * Get all of the events's permissions.
     */
    public function modelPermissions(): MorphMany
    {
        return $this->morphMany(ModelPermission::class, 'model');
    }

    /**
     * Scope to get only records that are permissible to authorizable
     */
    public function scopeWhereCanBeAccessedBy(Builder $query, mixed $authorizable): void
    {
        if ($this->authorizableIsSuperadmin($authorizable)) {
            return;
        }

        $query->whereHas('modelPermissions', function (Builder $query) use ($authorizable) {
            $query->where('authorizable_type', $authorizable::class)
                ->where('authorizable_id', $authorizable->id);
        })->exists();
    }

    /**
     *  Scope to get only records that are permissible to authorizable
     */
    public function scopeOrWhereCanBeAccessedBy(Builder $query, mixed $authorizable): void
    {
        if ($this->authorizableIsSuperadmin($authorizable)) {
            return;
        }
        
        $query->orWhereHas('modelPermissions', function (Builder $query) use ($authorizable) {
            $query->where('authorizable_type', $authorizable::class)
                ->where('authorizable_id', $authorizable->id);
        })->exists();
    }

    /**
     * Check if the provided authorizable has access to the model
     */
    public function canBeAccessedBy(mixed $authorizable)
    {
        return (bool) $this->modelPermissions()
            ->where('authorizable_type', $authorizable::class)
            ->where('authorizable_id', $authorizable->id)
            ->exists();
    }

    /**
     * Give access to provided authorizable for the model
     */
    public function giveAccessTo(mixed $authorizable)
    {
        $this->modelPermissions()->updateOrCreate([
            'authorizable_type' => $authorizable::class,
            'authorizable_id' => $authorizable->id,
        ]);
    }

    /**
     * Sync model permission for specified authorizable
     */
    public static function syncModelPermissions(array $ids = [], mixed $authorizable)
    {
        // Delete old permissions
        ModelPermission::where('authorizable_type', $authorizable::class)
            ->where('authorizable_id', $authorizable->id)
            ->where('model_type', self::class)
            ->delete();

        // Create new permissions
        foreach ($ids as $id) {
            ModelPermission::create([
                'authorizable_type' => $authorizable::class,
                'authorizable_id' => $authorizable->id,
                'model_type' => self::class,
                'model_id' => $id,
            ]);
        }
    }

    /**
     * Check if authorizable is superadmin
     */
    protected function authorizableIsSuperadmin(mixed $authorizable): bool
    {
        if ($authorizable instanceof User) {
            return $authorizable->hasRole('superadmin') || $authorizable->hasRole('owner');
        }

        if ($authorizable instanceof Role) {
            return $authorizable->name === 'superadmin' || $authorizable->name === 'owner';
        }

        return false;
    }
}