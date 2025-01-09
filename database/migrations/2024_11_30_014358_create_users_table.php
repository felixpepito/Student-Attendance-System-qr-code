<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->string('first_name'); // User's first name
            $table->string('last_name'); // User's last name
            $table->string('email')->unique(); // Email for authentication, must be unique
            $table->string('password'); // Password for authentication
            $table->enum('role', ['Admin', 'Instructor', 'Student'])->default('Student'); // Role-based access control
            $table->string('phone_number'); // Phone number column, not nullable
            $table->timestamp('email_verified_at'); // Email verification timestamp, not nullable
            $table->rememberToken(); // Token for "remember me" functionality
            $table->timestamps(); // Created at and updated at timestamps (not nullable)
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
