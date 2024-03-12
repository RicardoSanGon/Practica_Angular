<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Supplier;
use Illuminate\Support\Facades\Hash;
use Exception;

class SuppliersController extends Controller
{
    //
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'supplier_name'=>'required|string|alpha|max:255|min:3',
            'supplier_email'=>'required|email|unique:users|regex:/(.*@.{2,}\..{2,3})$/',
            'supplier_phone'=>'required|unique:suppliers|numeric|regex:/^[0-9]+$/'
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $supplier = new Supplier();
        $supplier->supplier_name=$request->supplier_name;
        $supplier->supplier_email=$request->supplier_email;
        $supplier->supplier_phone=$request->supplier_phone;

        try{
            $supplier->save();
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
            'supplier_name' => 'required|string|alpha|max:255|min:3',
            'supplier_email' => 'required|email|unique:suppliers, supplier_email,' . $id . '|regex:/(.*@.{2,}\..{2,3})$/',
            'supplier_phone' => 'required|numeric|regex:/^[0-9]+$/|unique:suppliers, supplier_phone,' . $id,
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        $supplier = Supplier::find($id);

        if ($supplier === null) {
            return response()->json(["msg" => "El proveedor no existe"], 400);
        }

        $supplier->supplier_name = $request->supplier_name;
        $supplier->supplier_email = $request->supplier_email;
        $supplier->supplier_phone = $request->supplier_phone;

        try {
            $supplier->save();

            return response()->json(["msg" => "Registro actualizado correctamente"], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar el proveedor", "Error" => $e], 500);
        }
    }
}
