<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;

class Attendee extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'email',
        'password',
        'event_app_id',
        'first_name',
        'last_name',
        'company',
        'position',
        'other_link',
        'facebook_link',
        'linkedin_link',
        'twitter_link',
        'country',
        'phone',
        'bio',
        'type',
        'avatar',
        'qr_code',
        'location',
        'personal_url',
        'referral_link',
        'google_id'
    ];

    protected $appends = [
        'avatar' => 'avatar_img',
        'qr_code' => 'qr_code_img',
        'name',
    ];

    protected $hidden = [
        'password'
    ];

    public function scopeCurrentEvent($query)
    {
        $query->where('event_app_id', session('event_id'));
    }

    public function getAvatarImgAttribute()
    {
        return $this->avatar ? url($this->avatar) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s';
    }
    public function getNameAttribute()
    {
        return $this->first_name . " " . $this->last_name;
    }
    public function getQrCodeImgAttribute()
    {
        return $this->qr_code != 'EMPTY' ? url(Storage::url($this->qr_code)) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s';
    }

    public function eventSelectedSessions()
    {
        return $this->belongsToMany(EventSession::class, 'attendee_event_session')->withPivot('rating', 'rating_description')->withTimestamps();
    }

    public function eventApp()
    {
        return $this->belongsTo(EventApp::class);
    }

    public function payments()
    {
        return $this->hasMany(AttendeePayment::class, 'attendee_id');
    }

    public function attendeePayments()
    {
        return $this->morphMany(AttendeePayment::class, 'payer');
    }

    public function attendeeFavSession()
    {
        return $this->hasMany(AttendeeFavSession::class);
    }

    public function purchased_tickets()
    {
        $tickets =  AttendeePurchasedTickets::where(function ($subQuery) {
            $subQuery->where(function ($subSubQuery) {
                $subSubQuery->where('attendee_id', $this->id);
                $subSubQuery->where('is_transfered', 0);
            });
            $subQuery->orWhere('transfered_to_attendee_id', $this->id);
        })->with(['ticket'])->get();
        return $tickets;
    }

    public function attendeePurchasedTickets()
    {
        return $this->hasMany(AttendeePurchasedTickets::class, 'attendee_id');
    }

    public function sessionRatings()
    {
        return $this->belongsToMany(EventSession::class, 'session_ratings')->withPivot('rating', 'rating_description')->withTimestamps();
    }

    public function eventCheckin()
    {
        return $this->hasOne(EventCheckIns::class, 'attendee_id');
    }

    public function ratedSessions()
    {
        return $this->belongsToMany(EventSession::class, 'session_ratings', 'attendee_id', 'event_session_id')
            ->withPivot('rating', 'rating_description')
            ->withTimestamps();
    }

    public function attendeeEventSessions()
    {
        return $this->hasMany(AttendeeEventSession::class, 'attendee_id', 'id');
    }


    public function chatMessages()
    {
        return $this->morphMany(ChatMessage::class, 'sender');
    }

    public function chatMemberships()
    {
        return $this->morphMany(ChatMember::class, 'participant');
    }

    /* ============================================= *
     *  Friend Request System Relations & Functions  *
     * ============================================= */

    // Sent friend requests
    public function sentFriendRequests()
    {
        return $this->hasMany(FriendRequest::class, 'sender_id');
    }

    // Received friend requests
    public function receivedFriendRequests()
    {
        return $this->hasMany(FriendRequest::class, 'receiver_id');
    }

    // Friends (accepted friendships)
    public function friends()
    {
        return $this->belongsToMany(Attendee::class, 'friendships', 'attendee_id', 'friend_id')
            ->withTimestamps()
            ->withPivot('friends_since');
    }

    // Check if a friend request exists between two users
    public function hasFriendRequestPending(Attendee $attendee)
    {
        return $this->sentFriendRequests()
            ->where('receiver_id', $attendee->id)
            ->where('status', 'pending')
            ->exists();
    }

    // Check if a friend request was received from a user
    public function hasFriendRequestReceived(Attendee $attendee)
    {
        return $this->receivedFriendRequests()
            ->where('sender_id', $attendee->id)
            ->where('status', 'pending')
            ->exists();
    }

    // Check if a user is a friend
    public function isFriendsWith(Attendee $attendee)
    {
        return $this->friends()->where('friend_id', $attendee->id)->exists();
    }

    // Add a friend
    public function addFriend(Attendee $attendee)
    {
        if (!$this->isFriendsWith($attendee) && !$this->hasFriendRequestPending($attendee)) {
            return FriendRequest::create([
                'sender_id' => $this->id,
                'receiver_id' => $attendee->id,
                'status' => 'pending'
            ]);
        }
        return false;
    }

    // Accept a friend request
    public function acceptFriendRequest(Attendee $attendee)
    {
        $request = $this->receivedFriendRequests()
            ->where('sender_id', $attendee->id)
            ->where('status', 'pending')
            ->first();

        if ($request) {
            $request->update([
                'status' => 'accepted',
                'accepted_at' => now()
            ]);

            // Create friendship records for both users
            $this->friends()->attach($attendee->id, ['friends_since' => now()]);
            $attendee->friends()->attach($this->id, ['friends_since' => now()]);

            return true;
        }

        return false;
    }

    // Reject a friend request
    public function rejectFriendRequest(Attendee $attendee)
    {
        $request = $this->receivedFriendRequests()
            ->where('sender_id', $attendee->id)
            ->where('status', 'pending')
            ->first();

        if ($request) {
            $request->update(['status' => 'rejected']);
            return true;
        }

        return false;
    }

    // Block a user
    public function blockUser(Attendee $attendee)
    {
        // Remove any existing friendship
        $this->removeFriend($attendee);

        // Update any existing requests to blocked
        FriendRequest::where(function ($query) use ($attendee) {
            $query->where('sender_id', $this->id)
                ->where('receiver_id', $attendee->id);
        })->orWhere(function ($query) use ($attendee) {
            $query->where('sender_id', $attendee->id)
                ->where('receiver_id', $this->id);
        })->update(['status' => 'blocked']);

        // Create a blocked record if no existing request
        if (!FriendRequest::where('sender_id', $this->id)
            ->where('receiver_id', $attendee->id)
            ->exists()) {
            FriendRequest::create([
                'sender_id' => $this->id,
                'receiver_id' => $attendee->id,
                'status' => 'blocked'
            ]);
        }

        return true;
    }

    // Remove a friend
    public function removeFriend(Attendee $attendee)
    {
        // Delete from friendships table
        $this->friends()->detach($attendee->id);
        $attendee->friends()->detach($this->id);

        // Update any friend requests
        FriendRequest::where(function ($query) use ($attendee) {
            $query->where('sender_id', $this->id)
                ->where('receiver_id', $attendee->id);
        })->orWhere(function ($query) use ($attendee) {
            $query->where('sender_id', $attendee->id)
                ->where('receiver_id', $this->id);
        })->delete();

        return true;
    }

    public function prayerRequest()
    {
        return $this->hasMany(PrayerRequest::class);
    }
}
