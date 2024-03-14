<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Supplier;
use Illuminate\Support\Facades\Hash;
use Exception;

class SuppliersController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::all();
        $suppliers = $suppliers->map(function ($supplier) {
            return [
                "id" => $supplier->id,
                "supplier_name" => $supplier->supplier_name,
                "supplier_email" => $supplier->supplier_email,
                "supplier_phone" => $supplier->supplier_phone,
                "supplier_status" => $supplier->supplier_status
            ];
        });
        return response()->json(['data' => $suppliers], 200);
    }
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'supplier_name'=>'required|string|regex:/^[a-zA-Z0-9 ]*$/|max:255|min:3',
            'supplier_email'=>'required|email|unique:suppliers|regex:/(.*@.{2,}\..{2,3})$/',
            'supplier_phone'=>'required|unique:suppliers|min:10|max:10|regex:/^[0-9]+$/'
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

    public function updateSupplierStatus(Request $request, $id)
    {
        return $this->updateStatus($request, 'suppliers', $id, 'supplier_status');
    }
}
