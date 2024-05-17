<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('otherName');
            $table->string('surname');
            $table->string('secondSurname');
            $table->string('email')->unique()->nullable();
            $table->string('identificationType');
            $table->string('identificationNumber');
            $table->unique(['identificationType', 'identificationNumber']);
            $table->string('country');
            $table->string('area');
            $table->string('state')->default('AVAILABLE');
            $table->date('admissionDate');
            $table->timestamps();
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
