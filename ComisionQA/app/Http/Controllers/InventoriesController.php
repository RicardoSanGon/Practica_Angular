<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Supplier;
use App\Models\User;
use App\Models\Vehicle_Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class InventoriesController extends Controller
{
    public function index(){
        $inventories = Inventory::all();
        $inventories = $inventories->map(function($inventory){
            return[
                "id"=>$inventory->id,
                "fecha de ingreso"=>$inventory->admission_date,
                "stock"=>$inventory->stock,
                "modelo"=>$inventory->models->model_name,
                "proveedor"=>$inventory->supplier->supplier_name,
            ];
        });
        return response()->json(['data'=>$inventories], 200);
    }
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'admission_date'=>'required|after_or_equal:today|date_format:Y-d-m',
            'stock'=>'required|integer|min:10',
            'model_id'=> 'required|numeric|regex:/^[0-9]+$/',
            'suppier_id'=> 'required|numeric|regex:/^[0-9]+$/',
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $model=Vehicle_Model::find($request->model_id);
        if(!$model){
            return response()->json(["msg"=>"El modelo no existe"],400);
        }
        $supplier=Supplier::find($request->suppier_id);
        if(!$supplier){
            return response()->json(["msg"=>"El proveedor no existe"],400);
        }
        $inventory = new Inventory();
        $inventory->admission_date = $request->admission_date;
        $inventory->stock = $request->stock;
        $inventory->vehicle_model_id = $request->model_id;
        $inventory->supplier_id = $request->suppier_id;

        try{
            $inventory->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }

        return response()->json([
            "msg" => "Registro correcto"
        ],201);
    }

    public function showTableAndForm(Request $request){
       $user=User::findOrfail(UsersController::getUserIdFromToken($request->header('authorization')));
        if($user->role_id==1)
           return response()->json(["permission"=>true],200);
        return response()->json(["permission"=>false], 401);
    }
}
