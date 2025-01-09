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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id(); // attendance_id (Primary Key)
            $table->string('email'); // email as a foreign key reference from the students table
            $table->foreign('email')->references('email')->on('students')->onDelete('cascade');
            $table->foreignId('class_id')->constrained('classes')->onDelete('cascade');
            $table->foreignId('session_id')->constrained('sessions')->onDelete('cascade');
            $table->date('date');
            $table->enum('status', ['Present', 'Absent', 'Late']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
