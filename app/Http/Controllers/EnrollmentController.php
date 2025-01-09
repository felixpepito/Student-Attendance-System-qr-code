<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    /**
     * Display a listing of the enrollments.
     */
    public function index()
    {
        $enrollments = Enrollment::with(['student', 'course'])->get(); // Get all enrollments with student and course details
        return response()->json($enrollments);
    }

    /**
     * Store a newly created enrollment in the database.
     */
    public function store(Request $request)
{
    $request->validate([
        'student_id' => 'required|exists:students,id',
        'course_id' => 'required|exists:courses,id',
    ]);

    $enrollment = Enrollment::create($request->all());

    // Include course name in the response
    $courseName = $enrollment->course->name;

    return response()->json([
        'success' => true,
        'message' => 'Enrollment successful!',
        'course_name' => $courseName, // Include course name
        'data' => $enrollment,
    ], 201);
}



    /**
     * Display the specified enrollment.
     */
    public function show(Enrollment $enrollment)
    {
        return response()->json($enrollment->load(['student', 'course'])); // Return the specific enrollment with student and course details
    }

    /**
     * Update the specified enrollment in the database.
     */
    public function update(Request $request, Enrollment $enrollment)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'course_id' => 'required|exists:courses,id',
            'enrollment_date' => 'nullable|date',
        ]);

        $enrollment->update($request->all()); // Update the enrollment details

        return response()->json($enrollment); // Return the updated enrollment
    }

    /**
     * Remove the specified enrollment from the database.
     */
    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete(); // Delete the enrollment

        return response()->json(['message' => 'Enrollment deleted successfully.'], 200); // Success message
    }
}
