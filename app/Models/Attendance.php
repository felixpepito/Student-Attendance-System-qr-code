<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    // Define fillable fields for mass assignment
    protected $fillable = ['email', 'class_id', 'session_id', 'date', 'status'];

    // Define the relationship with the Student model (using email)
    public function student()
    {
        return $this->belongsTo(Student::class, 'email', 'email'); // Use 'email' as the key for the relationship
    }

    // Define the relationship with the CourseClass model
    public function courseClass()
    {
        return $this->belongsTo(CourseClass::class, 'class_id');
    }

    // Define the relationship with the Session model
    public function session()
    {
        return $this->belongsTo(Session::class);
    }
}
