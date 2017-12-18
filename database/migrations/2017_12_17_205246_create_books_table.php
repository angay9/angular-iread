<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->increments('id');
            $table->string('external_id', 50);
            $table->string('title', 200)->nullable()->default('');
            $table->string('authors')->nullable()->default('');
            $table->text('description')->nullable();
            $table->string('preview_link')->nullable()->default('');
            $table->string('categories')->nullable()->default('');
            $table->integer('page_count')->nullable();
            $table->date('publish_date')->nullable();
            $table->string('publisher')->nullable()->default('');
            $table->string('thumbnail')->nullable()->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
