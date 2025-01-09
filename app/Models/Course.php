<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    // Specify the fields that are mass assignable
    protected $fillable = [
        'course_name', 'course_code', 'description',
    ];

    // You can define relationships here, if any
}
