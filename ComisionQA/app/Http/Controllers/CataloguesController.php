<?php

namespace App\Http\Controllers;

use App\Models\Catalogue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class CataloguesController extends Controller
{
    //

    public function store(Request $request){
        $validaciones = Validator::make($request->all(),[
            "name"=> 'required|min:3|max:50|alpha',
        ]);

        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        
        $catalogue = new Catalogue();
        $catalogue->name=$request->name;

        try{
            $catalogue->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }

        return response()->json([
            "msg" => "Registro correcto"
        ],201);
    }
}
