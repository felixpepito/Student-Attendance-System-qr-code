<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    // Handle login request
    // In your LoginController
public function login(Request $request)
{
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $user = Auth::user();

        // Check role and redirect accordingly
        if ($user->role === 'student') {
            return response()->json([
                'message' => 'Login successful!',
                'role' => 'student',
                'redirect' => '/studentdashboard',  // Or wherever you want students to go
            ]);
        }

        if ($user->role === 'teacher') {
            return response()->json([
                'message' => 'Login successful!',
                'role' => 'teacher',
                'redirect' => '/dashboard',  // Or wherever you want teachers to go
            ]);
        }

        return response()->json(['message' => 'Invalid credentials or role.'], 401);
    }

    return response()->json(['message' => 'Invalid credentials.'], 401);
}


    // Handle logout request
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
