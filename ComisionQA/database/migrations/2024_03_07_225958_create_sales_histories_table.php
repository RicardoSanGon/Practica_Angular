<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales_histories', function (Blueprint $table) {
            $table->id();
            $table->string('sale_date');
            $table->float('total_amount');
            $table->integer('quantity');
            $table->foreignId('vehicle_model_id')->references('id')->on('vehicle_models');
            $table->foreignId('customer_id')->references('id')->on('customers');
            $table->foreignId('detail_id')->references('id')->on('order_details');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales__histories');
    }
};
