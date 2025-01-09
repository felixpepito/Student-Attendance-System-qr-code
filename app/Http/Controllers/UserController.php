<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Index method to handle requests to the default route

    public function index()
    {
        // Retrieve all users with specific fields you want to display
        $users = User::select('id', 'first_name', 'last_name', 'email', 'role', 'phone_number', 'created_at', 'updated_at')->get();

        // Return the users as a JSON response
        return response()->json($users);
    }

    // Store method to handle saving new user data
    public function store(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:Student,Instructor,Admin',
            'phone_number' => 'required|string|max:15',  // Add validation for phone number
        ]);

        // Create and store the user in the database
        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => $validatedData['role'],
            'phone_number' => $validatedData['phone_number'],  // Save the phone number
        ]);

        return response()->json([
            'message' => 'User stored successfully!',
            'user' => $user,
        ]);
    }


    public function update(Request $request, $id)
{
    // Validate the incoming request data
    $validatedData = $request->validate([
        'first_name' => 'sometimes|string|max:255',
        'last_name' => 'sometimes|string|max:255',
        'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
        'password' => 'nullable|string|min:8|confirmed',
        'role' => 'sometimes|in:Student,Instructor,Admin',
        'phone_number' => 'sometimes|string|max:15',
    ]);

    // Find the user by ID
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // If password is being updated, hash it
    if ($request->has('password')) {
        $validatedData['password'] = Hash::make($validatedData['password']);
    }

    // Update the user with validated data
    $user->update($validatedData);

    return response()->json([
        'message' => 'User updated successfully!',
        'user' => $user,
    ]);
}


    // Register method to handle new user registrations
    public function register(Request $request)
    {
        // Validate the incoming request, including the phone number
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:Student,Instructor,Admin',
            'phone_number' => 'required|string|max:15',  // Make phone number required and with a max length of 15
        ]);

        // Create a new user with validated data
        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => $validatedData['role'],
            'phone_number' => $validatedData['phone_number'],  // Add phone number here
        ]);

        // Create a token for the new user
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user,
            'token' => $token,
        ]);
    }

    // Login method to authenticate the user
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid email or password'], 401);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        $response = [
            'user' => $user,
            'role' => $user->role,
            'token' => $token,
        ];

        if ($user->role == 'Student') {
            return response()->json([
                'message' => 'Login successful! Redirecting to student dashboard.',
                'redirect_url' => 'http://localhost:3000/studentdashboard',
                'data' => $response
            ]);
        } elseif ($user->role == 'Instructor') {
            return response()->json([
                'message' => 'Login successful! Redirecting to instructor dashboard.',
                'redirect_url' => 'http://localhost:3000/dashboard',
                'data' => $response
            ]);
        } elseif ($user->role == 'Admin') {
            return response()->json([
                'message' => 'Login successful! Redirecting to admin dashboard.',
                'redirect_url' => 'http://localhost:3000/admin',
                'data' => $response
            ]);
        }

        return response()->json(['message' => 'Role not recognized'], 401);
    }

    // Logout method to invalidate the user token
    public function logout(Request $request)
    {
        $request->user()->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json(['message' => 'Logged out successfully']);
    }

// Destroy method to handle user deletion
public function destroy($id)
{
    // Find the user by ID
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Delete the user
    $user->delete();

    return response()->json(['message' => 'User deleted successfully']);
}
}