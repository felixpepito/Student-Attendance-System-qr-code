<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use Illuminate\Validation\ValidationException;

class AttendanceController extends Controller
{
    // List all attendance records
    public function index()
    {
        $attendances = Attendance::all();
        return response()->json($attendances);
    }

    // Display a specific attendance record
    public function show($id)
    {
        $attendance = Attendance::find($id);

        if ($attendance) {
            return response()->json($attendance);
        } else {
            return response()->json(['success' => false, 'message' => 'Attendance record not found'], 404);
        }
    }

    // Create a new attendance record
    public function store(Request $request)
    {
        // Validate incoming data
        $request->validate([
            'email' => 'required|email',
            'class_id' => 'required|integer',
            'session_id' => 'required|integer',
            'date' => 'required|date',
            'status' => 'required|string',
        ]);

        // Create a new attendance record
        $attendance = Attendance::create([
            'email' => $request->email,
            'class_id' => $request->class_id,
            'session_id' => $request->session_id,
            'date' => $request->date,
            'status' => $request->status,
        ]);

        // Return success or failure response
        if ($attendance) {
            return response()->json(['success' => true, 'attendance' => $attendance]);
        } else {
            return response()->json(['success' => false, 'message' => 'Error recording attendance']);
        }
    }

    // Update an existing attendance record
    public function update(Request $request, $id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['success' => false, 'message' => 'Attendance record not found'], 404);
        }

        // Validate incoming data
        $request->validate([
            'email' => 'required|email',
            'class_id' => 'required|integer',
            'session_id' => 'required|integer',
            'date' => 'required|date',
            'status' => 'required|string',
        ]);

        // Update the attendance record
        $attendance->update([
            'email' => $request->email,
            'class_id' => $request->class_id,
            'session_id' => $request->session_id,
            'date' => $request->date,
            'status' => $request->status,
        ]);

        return response()->json(['success' => true, 'attendance' => $attendance]);
    }

    // Delete an attendance record
    public function destroy($id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['success' => false, 'message' => 'Attendance record not found'], 404);
        }

        $attendance->delete();
        return response()->json(['success' => true, 'message' => 'Attendance record deleted successfully']);
    }
}
