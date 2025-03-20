<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormSubmission extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    public function fieldValues()
    {
        return $this->hasMany(FormFieldValue::class);
    }
    
    public function attendee()
    {
        return $this->belongsTo(Attendee::class);
    }
}
