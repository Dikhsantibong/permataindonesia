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
        Schema::table('events', function (Blueprint $table) {
            $table->string('category')->default('Event')->after('cover_image'); // Event, Seminar, Pelatihan, Lainnya
            $table->string('speaker')->nullable()->after('category');
            $table->string('registration_link')->nullable()->after('location');
            $table->string('contact_person')->nullable()->after('registration_link');
            $table->boolean('is_free')->default(true)->after('contact_person');
            $table->decimal('price', 12, 2)->nullable()->after('is_free');
            $table->integer('capacity')->nullable()->after('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn([
                'category',
                'speaker',
                'registration_link',
                'contact_person',
                'is_free',
                'price',
                'capacity',
            ]);
        });
    }
};
