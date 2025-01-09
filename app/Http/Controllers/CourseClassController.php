<?php

namespace App\Http\Controllers;

use App\Models\CourseClass;
use Illuminate\Http\Request;

class CourseClassController extends Controller
{
    /**
     * Display a listing of the classes.
     */
    public function index()
    {
        $classes = CourseClass::with('instructor')->get(); // Get all classes with instructor details
        return response()->json($classes);
    }

    /**
     * Store a newly created class in the database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'class_name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'instructor_id' => 'required|exists:instructors,id',
            'schedule' => 'nullable|string',
        ]);

        $class = CourseClass::create($request->all()); // Create a new class

        return response()->json($class, 201); // Return the created class with 201 status code
    }

    /**
     * Display the specified class.
     */
    public function show(CourseClass $courseClass)
    {
        return response()->json($courseClass); // Return the specific class
    }

    /**
     * Update the specified class in the database.
     */
    public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'class_name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'instructor_id' => 'required|exists:instructors,id', // Ensure instructor exists
            'schedule' => 'nullable|string',
        ]);

        // Find the class by ID
        $courseClass = CourseClass::find($id);

        // Check if the class exists
        if (!$courseClass) {
            return response()->json(['message' => 'Class not found'], 404); // If not found, return error response
        }

        // Update the class with the validated request data
        $courseClass->update($request->all());

        return response()->json($courseClass); // Return the updated class
    }

    /**
     * Remove the specified class from the database.
     */
    public function destroy($id)
    {
        // Find the class by ID
        $courseClass = CourseClass::find($id);

        // Check if the class exists
        if (!$courseClass) {
            return response()->json(['message' => 'Class not found'], 404); // If not found, return error response
        }

        // Delete the class
        $courseClass->delete();

        return response()->json(['message' => 'Class deleted successfully.'], 200); // Success message
    }
}
