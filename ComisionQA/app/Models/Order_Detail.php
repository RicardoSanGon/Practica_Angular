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

    protected static function boot()
    {
        parent::boot();
        static::updated(function ($orderDetail) {
            if ($orderDetail->status === 'aceptada') {
                $bill = new Bill();
                $bill->detail_id = $orderDetail->id;
                $bill->total_amount = $orderDetail->price;
                $bill->tax_amount = $orderDetail->price * 0.16;
                $bill->save();
            }
        });
    }
}
