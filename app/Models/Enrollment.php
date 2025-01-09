<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    // Define fillable fields for mass assignment
    protected $fillable = ['student_id', 'course_id', 'enrollment_date'];

    // Define relationships
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

}    