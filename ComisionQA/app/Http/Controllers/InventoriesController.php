<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class InventoriesController extends Controller
{
    //
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'admission_date'=>'required|date',
            'stock'=>'required|string|alpha|max:255|min:3',
            'model_id'=> 'required|numeric|regex:/^[0-9]+$/',
            'suppier_id'=> 'required|numeric|regex:/^[0-9]+$/',
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $inventory = new Inventory();
        $inventory->admission_date = $request->admission_date;
        $inventory->stock = $request->stock;
        $inventory->model_id = $request->model_id;
        $inventory->suppier_id = $request->suppier_id;
        
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
}
