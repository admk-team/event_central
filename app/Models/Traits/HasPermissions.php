<?php

namespace App\Models\Traits;

use App\Models\ModelPermission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasPermissions
{
    /**
     * Get all of the events's permissions.
     */
    public function permissions(): MorphMany
    {
        return $this->morphMany(ModelPermission::class, 'model');
    }

    /**
     * Check if the provided authorizable has access to the model
     */
    public function authorize(User|Role $authorizable)
    {
        return (bool) $this->permissions()->whereHas(
            'authorizable', 
            fn (Builder $query) => 
                $query->where('authorizable_type', $authorizable::class)
                ->where('authorizable_id', $authorizable->id)
        )->count();
    }
}