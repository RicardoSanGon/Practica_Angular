<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Rol;
use Illuminate\Support\Facades\Validator;
use Exception;

class RolsController extends Controller
{
    public function index(Request $request){
        $rols = Rol::all();
        $query = Rol::query();
        $sql = $query->toSql();
        $rols = $rols->map(function($rol){
            return[
                "id"=>$rol->id,
                "rol"=>$rol->rol,
            ];
        });
        LogHistoryController::store($request,"Rols",$sql,UsersController::getUserIdFromToken($request->header('authorization')));
        return response()->json(['data'=>$rols], 200);
    }

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
        LogHistoryController::store($request,"Rols",$request->rol,UsersController::getUserIdFromToken($request->header('authorization')));

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
            LogHistoryController::store($request, "Rols", $request->rol, UsersController::getUserIdFromToken($request->header('authorization')));
            return response()->json(["msg" => "Registro actualizado correctamente"], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar el rol", "Error" => $e], 500);
        }
    }
}
