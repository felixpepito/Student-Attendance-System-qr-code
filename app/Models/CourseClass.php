<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseClass extends Model
{
    use HasFactory;

    // Explicitly specify the table name
    protected $table = 'classes'; // This tells Eloquent to use the 'classes' table

    // Define fillable fields for mass assignment
    protected $fillable = ['class_name', 'subject', 'instructor_id', 'schedule'];

    // Define the relationship with the Instructor model
    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }
}
