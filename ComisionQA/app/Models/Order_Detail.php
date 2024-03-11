<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_Detail extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $table = "order_details";

    public function vehicle_model(){
        return $this->belongsTo(Vehicle_Model::class,'vehicle_model_id');
    }
}
