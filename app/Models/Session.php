<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    // Define fillable fields for mass assignment
    protected $fillable = ['class_id', 'session_date', 'qr_code'];

    // Define the relationship with the Class model
    public function courseClass()
    {
        return $this->belongsTo(CourseClass::class, 'class_id');
    }
}
