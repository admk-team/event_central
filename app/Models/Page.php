<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Page extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scopeHomePage(Builder $query)
    {
        $query->where('is_home_page', true);
    }

    public function scopePublished(Builder $query)
    {
        $query->where('is_published', true);
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(EventApp::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function header(): BelongsTo
    {
        return $this->belongsTo(Header::class);
    }

    public function footer(): BelongsTo
    {
        return $this->belongsTo(Footer::class);
    }
}
