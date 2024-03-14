<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle_Model extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $table = 'vehicle_models';
    public function brand(){
        return $this->belongsTo(Brand::class);
    }

    public function inventories(){
        return $this->hasMany(Inventory::class,'id');
    }

    public function order_details(){
        return $this->hasMany(Order_Detail::class,'id');
    }

    public function sale_histories(){
        return $this->hasMany(Sale_History::class,'id');
    }
}
