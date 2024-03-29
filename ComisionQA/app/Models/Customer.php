<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function sale_histories(){
        return $this->hasMany(Sale_History::class);
    }

    public function orders(){
        return $this->hasMany(Order::class,'id');
    }
}
