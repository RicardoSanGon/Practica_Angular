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

    public function update(Request $request, $id)
    {
        $validaciones = Validator::make($request->all(), [
            'rol' => 'required|string|alpha|max:255|min:3',
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        $rol = Rol::find($id);

        if ($rol === null) {
            return response()->json(["msg" => "El rol no existe"], 400);
        }

        $rol->rol = $request->rol;

        try {
            $rol->save();

            return response()->json(["msg" => "Registro actualizado correctamente"], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar el rol", "Error" => $e], 500);
        }
    }
}
