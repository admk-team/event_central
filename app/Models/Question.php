<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['event_session_id', 'user_id', 'content', 'likes_count', 'dislikes_count'];

    public function eventApp() // Use `eventApp` to match `EventApp`
    {
        return $this->belongsTo(EventSession::class, 'event_session_id'); // Adjust foreign key if different
    }

    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function votes()
    {
        return $this->hasMany(QuestionVote::class);
    }
    public function user()
    {
        return $this->belongsTo(Attendee::class, 'user_id');
    }
}