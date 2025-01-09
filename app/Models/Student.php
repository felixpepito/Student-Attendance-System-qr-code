<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'date_of_birth',
        'email',
        'phone_number',
    ];

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}