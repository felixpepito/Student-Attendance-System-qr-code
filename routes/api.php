<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\CourseClassController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\AttendanceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication routes



Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('auth:sanctum');
Route::put('/users/{id}', [UserController::class, 'update'])->middleware('auth:sanctum');



Route::get('classes', [CourseClassController::class, 'index']); // GET request to list all classes
Route::post('classes', [CourseClassController::class, 'store']); // POST request to create a new class
Route::get('lasses/{courseClass}', [CourseClassController::class, 'show']); // GET request to view a specific class
Route::put('/classes/{id}', [CourseClassController::class, 'update']); // Update a class
Route::delete('/classes/{id}', [CourseClassController::class, 'destroy']); // Delete a class

Route::post('/attendance', [AttendanceController::class, 'store']);
Route::get('attendances', [AttendanceController::class, 'index']);
Route::post('attendances', [AttendanceController::class, 'store']);
Route::get('attendances/{attendance}', [AttendanceController::class, 'show']);
Route::put('attendances/{attendance}', [AttendanceController::class, 'update']);
Route::delete('attendances/{attendance}', [AttendanceController::class, 'destroy']);

Route::get('courses', [CourseController::class, 'index']);  // GET request for listing courses
Route::post('courses', [CourseController::class, 'store']); // POST request for creating a new course
Route::get('courses/{course}', [CourseController::class, 'show']); // GET request to show a specific course
Route::put('courses/{course}', [CourseController::class, 'update']); // PUT request to update a course
Route::delete('courses/{course}', [CourseController::class, 'destroy']); // DELETE request to delete a course


Route::get('/enrollments', [EnrollmentController::class, 'index']);
Route::post('/enrollments', [EnrollmentController::class, 'store']);
Route::get('/enrollments/{enrollment}', [EnrollmentController::class, 'show']);
Route::put('/enrollments', [EnrollmentController::class, 'update']);
Route::delete('/enrollments', [EnrollmentController::class, 'destroy']);

Route::get('instructors', [InstructorController::class, 'index']); // GET request for listing all instructors
Route::post('instructors', [InstructorController::class, 'store']); // POST request for creating a new instructor
Route::get('instructors/{instructor}', [InstructorController::class, 'show']); // GET request to view a specific instructor
Route::put('instructors', [InstructorController::class, 'update']); // PUT request to update a specific instructor
Route::delete('instructors/{instructor}', [InstructorController::class, 'destroy']); // DELETE request to delete a specific instructor

Route::get('sessions', [SessionController::class, 'index']); // Get all sessions
Route::post('sessions', [SessionController::class, 'store']); // Create a new session
Route::get('sessions/{session}', [SessionController::class, 'show']); // Get a specific session
Route::put('sessions/{session}', [SessionController::class, 'update']); // Update a session
Route::delete('sessions/{session}', [SessionController::class, 'destroy']); // Delete a session

Route::post('/validate-student', [StudentController::class, 'validateStudent']);
Route::post('students', [StudentController::class, 'store']); // Create student
Route::get('students', [StudentController::class, 'index']); // Get all students
Route::get('students/{id}', [StudentController::class, 'show']); // Get student by ID
Route::put('students/{id}', [StudentController::class, 'update']); // Update student
Route::delete('students/{id}', [StudentController::class, 'destroy']); // Delete student

Route::fallback(function () {
    return response()->json(['message' => 'Endpoint not found.'], 404);
});
