<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function models(){
        return $this->belongsTo(Vehicle_Model::class,'vehicle_model_id');
    }
    public function supplier(){
        return $this->belongsTo(Supplier::class,'supplier_id');
    }
}
