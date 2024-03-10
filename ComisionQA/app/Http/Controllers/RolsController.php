<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Rol;
use Illuminate\Support\Facades\Validator;
use Exception;

class RolsController extends Controller
{
    //

    public function store(Request $request){
        $validaciones = Validator::make($request->all(),[
            'rol'=>'required|string|alpha|max:255|min:3'
        ]);

        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }

        $rol = new Rol();
        $rol->rol=$request->rol;

        try{
            $rol->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }

        return response()->json([
            "msg" => "Registro correcto"
        ],201);
    }
}
