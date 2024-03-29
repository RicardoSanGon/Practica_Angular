<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'suppliers';

    public function inventories(){
        return $this->hasMany(Inventory::class,'id');
    }
}
