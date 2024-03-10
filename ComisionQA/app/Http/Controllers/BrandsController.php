<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class BrandsController extends Controller
{
    //

    public function store(Request $request){
        $validaciones = Validator::make($request->all(),[
            "brand_name" => 'required|min:3|string|alpha',
            "catalogue_id" => 'required|numeric|regex:/^[0-9]+$/'
        ]);

        if($validaciones->failed()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=> "Error en los datos"],400);
        }

        $brand = new Brand();
        $brand->brand_name = $request->brand_name;
        $brand->catalogue_id=$request->catalogue_id;

        try{
            $brand->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }

        return response()->json([
            "msg" => "Registro correcto"
        ],201);

    }
}
