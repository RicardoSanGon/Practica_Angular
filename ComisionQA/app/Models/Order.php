<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function customer(){
        return $this->belongsTo(Customer::class,'customer_id');
    }

    public function order_details(){
        return $this->hasMany(Order_Detail::class,'id');
    }
}
