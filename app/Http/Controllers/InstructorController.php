<?php

namespace App\Http\Controllers;

use App\Models\Instructor;
use Illuminate\Http\Request;

class InstructorController extends Controller
{
    /**
     * Display a listing of the instructors.
     */
    public function index()
    {
        $instructors = Instructor::all(); // Get all instructors
        return response()->json($instructors);
    }

    /**
     * Store a newly created instructor in the database.
     */
    public function store(Request $request)
{
    // Validate the incoming request
    $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'email' => 'required|email|unique:instructors,email',
        'phone_number' => 'required|string|max:255',
    ]);

    // Check if the instructor is registered in the users table
    $user = \App\Models\User::where('email', $request->email)->first();

    if (!$user) {
        // If the user is not registered, return an error message
        return response()->json(['error' => 'Instructor is not registered.'], 400);
    }

    // Check if the first name, last name, and phone number match the user's data
    if ($user->first_name !== $request->first_name || $user->last_name !== $request->last_name || ($user->phone_number && $user->phone_number !== $request->phone_number)) {
        // If any of the details do not match, return an invalid response
        return response()->json(['error' => 'Instructor details do not match with the registered user.'], 400);
    }

    // Create a new instructor
    $instructor = Instructor::create($request->all());

    // Return the created instructor with a 201 status code
    return response()->json($instructor, 201);
}


    /**
     * Display the specified instructor.
     */
    public function show(Instructor $instructor)
    {
        return response()->json($instructor); // Return the specific instructor
    }

    /**
     * Update the specified instructor in the database.
     */
    public function update(Request $request, Instructor $instructor)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:instructors,email,' . $instructor->id,
            'phone_number' => 'required|string|max:255',
        ]);

        $instructor->update($request->all()); // Update the instructor details

        return response()->json($instructor); // Return the updated instructor
    }

    /**
     * Remove the specified instructor from the database.
     */
    public function destroy(Instructor $instructor)
    {
        $instructor->delete(); // Delete the instructor

        return response()->json(['message' => 'Instructor deleted successfully.'], 200); // Success message
    }
}
