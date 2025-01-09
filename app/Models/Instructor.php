<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    use HasFactory;

    // Define fillable fields for mass assignment
    protected $fillable = ['first_name', 'last_name', 'email', 'phone_number'];
}
