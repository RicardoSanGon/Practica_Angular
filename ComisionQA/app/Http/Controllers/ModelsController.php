<?php

namespace App\Http\Controllers;

use App\Models\Vehicle_Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class ModelsController extends Controller
{
    //
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'model_name'=>'required|string|alpha|max:255|min:3',
            'model_year'=>'required|numeric|regex:/^[0-9]+$/',
            'model_description'=> 'required|string|alpha|max:255|min:3',
            'model_price'=> 'required|double',
            'model_stock'=>'required|numeric|regex:/^[0-9]+$/',
            'brand_id'=> 'required|numeric|regex:/^[0-9]+$/',
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $modelo = new Vehicle_Model();
        $modelo->model_name=$request->model_name;
        $modelo->model_year=$request->model_year;
        $modelo->model_description=$request->model_description;
        $modelo->model_price = $request->model_price;
        $modelo->model_stock=$request->model_stock;
        $modelo->brand_id=$request->brand_id;

        try{
            $modelo->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }

        return response()->json([
            "msg" => "Registro correcto"
        ],201);
    }
}
