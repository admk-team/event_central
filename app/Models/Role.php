<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role as SpatieRole;

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
}
