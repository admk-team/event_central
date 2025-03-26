<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['event_session_id', 'user_id', 'user_type', 'content', 'likes_count', 'dislikes_count'];

    public function eventApp()
    {
        return $this->belongsTo(EventSession::class, 'event_session_id');
    }

    public function user()
    {
        return $this->morphTo('user', 'user_type', 'user_id'); // Polymorphic relationship
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function votes()
    {
        return $this->hasMany(QuestionVote::class);
    }
}