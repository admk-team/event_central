<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ChatGroup extends Model
{
    use HasFactory;
    protected $fillable = ['event_id', 'image', 'name', 'type','visibility', 'created_by'];

    public function members()
    {
        return $this->hasMany(ChatMember::class, 'group_id');
    }

    public function messages()
    {
        return $this->hasMany(ChatMessage::class, 'group_id');
    }

    public function getImageAttribute($value)
    {
        return $value ? asset(Storage::url($value))  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s';
    }
}
