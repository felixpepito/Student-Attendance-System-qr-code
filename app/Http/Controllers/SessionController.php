<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    
    public function index()
    {
        $sessions = Session::with('courseClass')->get(); 
        return response()->json($sessions); 
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'class_id' => 'required|exists:classes,id', // Ensure class exists
            'session_date' => 'required|date',
            'qr_code' => 'nullable|string',
        ]);

        // Create a new session
        $session = Session::create($request->all());

        return response()->json($session, 201); // Return created session with 201 status
    }

    /**
     * Display the specified session.
     */
    public function show(Session $session)
    {
        return response()->json($session); // Return the specified session as JSON
    }

    public function update(Request $request, Session $session)
    {
        $request->validate([
            'class_id' => 'required|exists:classes,id',
            'session_date' => 'required|date',
            'qr_code' => 'nullable|string',
        ]);

        // Update the session with the new data
        $session->update($request->all());

        return response()->json($session); // Return the updated session
    }

    public function destroy(Session $session)
    {
        $session->delete(); // Delete the session

        return response()->json(['message' => 'Session deleted successfully.'], 200); // Success message
    }
}
