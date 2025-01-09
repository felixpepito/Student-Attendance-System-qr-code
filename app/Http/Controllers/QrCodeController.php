<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; // Ensure the Log facade is imported

class QrCodeController extends Controller
{
    // Method to view all attendances for the authenticated user
    public function viewAttendances()
    {
        $attendances = Attendance::where('user_id', Auth::id())->get();
        return response()->json(['attendances' => $attendances]);
    }

    // Method to scan a QR code and record attendance
    public function scanQr(Request $request)
    {
        // Log the authenticated user ID for debugging purposes
        Log::info('Auth ID:', ['user_id' => Auth::id()]); // Correct logging syntax

        // Get QR code data from the request
        $data = $request->input('qr_code_data');

        try {
            // Check if the user is authenticated
            if (!Auth::check()) {
                return response()->json(['success' => false, 'message' => 'User not authenticated.'], 401);
            }

            // Create a new attendance record
            $attendance = new Attendance();
            $attendance->user_id = Auth::id();
            $attendance->qr_code_data = $data;
            $attendance->scanned_at = now();
            $attendance->save();

            // Return success response
            return response()->json(['success' => true, 'message' => 'Attendance recorded successfully!']);
        } catch (\Exception $e) {
            // Handle any errors during the attendance recording
            Log::error('Error recording attendance: ', ['error' => $e->getMessage()]); // Log the error message for debugging
            return response()->json(['success' => false, 'message' => 'Failed to record attendance.', 'error' => $e->getMessage()], 500);
        }
    }
}
