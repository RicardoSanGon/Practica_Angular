<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale_History extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'sales_histories';

    public function model()
    {
        return $this->belongsTo(Vehicle_Model::class,'vehicle_model_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class,'customer_id');
    }

}
