<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    // Get all students
    public function index()
    {
        $students = Student::all();
        return response()->json($students);  // Return students as JSON
    }

public function store(Request $request)
{
    // Validate the incoming request
    $request->validate([
        'first_name' => 'required',
        'last_name' => 'required',
        'email' => 'required|email|unique:students,email',
    ]);

    // Check if the user is registered with the provided email
    $user = \App\Models\User::where('email', $request->email)->first();

    if (!$user) {
        // If the user is not registered, return an error message
        return response()->json(['error' => 'Student is not registered.'], 400);
    }

    // Check if the user's role is 'Student'
    if ($user->role !== 'Student') {
        // If the user is not a student, return an error message
        return response()->json(['error' => 'Only students are allowed to perform this action.'], 403); // 403 Forbidden status code
    }

    // Check if the first name and last name match the user's data
    if ($user->first_name !== $request->first_name || $user->last_name !== $request->last_name) {
        // If the names don't match, return an error message
        return response()->json(['error' => 'Invalid first name or last name.'], 400);
    }

    // Create the student
    $student = Student::create($request->all());

    // Return success response with the created student data
    return response()->json([
        'message' => 'Student created successfully.',
        'student' => $student
    ], 201);  // 201 Created status code
}

    // Get a specific student by ID
    public function show($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        return response()->json($student);
    }

    // Update an existing student
    public function update(Request $request, $id)
    {
        $request->validate([
            'email' => 'required|email|unique:students,email,' . $id,
        ]);

        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->update($request->all());

        return response()->json([
            'message' => 'Student updated successfully.',
            'student' => $student
        ]);
    }

    // Delete a student
    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->delete();

        return response()->json([
            'message' => 'Student deleted successfully.'
        ]);
    }
}
