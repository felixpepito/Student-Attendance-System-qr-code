<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the courses.
     */
    public function index()
    {
        $courses = Course::all(); // Get all courses
        return response()->json($courses);  // Return as JSON
    }

    /**
     * Store a newly created course in the database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'course_name' => 'required|string|max:255',
            'course_code' => 'required|string|max:10|unique:courses',
            'description' => 'nullable|string',
        ]);

        $course = Course::create($request->all()); // Create a new course

        return response()->json($course, 201); // Return the created course with 201 status code
    }

    /**
     * Display the specified course.
     */
    public function show(Course $course)
    {
        return response()->json($course); // Return the course as JSON
    }

    /**
     * Update the specified course in the database.
     */
    public function update(Request $request, Course $course)
    {
        $request->validate([
            'course_name' => 'required|string|max:255',
            'course_code' => 'required|string|max:10|unique:courses,course_code,' . $course->id,
            'description' => 'nullable|string',
        ]);

        $course->update($request->all()); // Update course details

        return response()->json($course); // Return the updated course as JSON
    }

    /**
     * Remove the specified course from the database.
     */
    public function destroy(Course $course)
    {
        $course->delete(); // Delete the course

        return response()->json(['message' => 'Course deleted successfully.'], 200); // Return success message
    }
}
