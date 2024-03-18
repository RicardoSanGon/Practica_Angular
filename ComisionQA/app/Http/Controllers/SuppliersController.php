<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Models\Supplier;
use Illuminate\Support\Facades\Hash;
use Exception;

class SuppliersController extends Controller
{
    public function index(Request $request)
    {
        $suppliers = Supplier::all();
        $query = Supplier::query();
        $sql = $query->toSql();
        $suppliers = $suppliers->map(function ($supplier) {
            return [
                "id" => $supplier->id,
                "supplier_name" => $supplier->supplier_name,
                "supplier_email" => $supplier->supplier_email,
                "supplier_phone" => $supplier->supplier_phone,
                "supplier_status" => $supplier->supplier_status ? "Activo" : "Inactivo"
            ];
        });
        LogHistoryController::store($request, 'suppliers', $sql,UsersController::getUserIdFromToken($request->header('authorization')));
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
        $data=$request->supplier_name." ".$request->supplier_email." ".$request->supplier_phone;
        try{
            $supplier->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }
        LogHistoryController::store($request,'suppliers',$data,UsersController::getUserIdFromToken($request->header('authorization')));
        return response()->json([
            "msg" => "Registro correcto"
        ],201);
    }

    public function update(Request $request, $id)
    {
        $validaciones = Validator::make($request->all(), [
            'supplier_name' => 'sometimes|string|regex:/^[a-zA-Z0-9 ,\-]+$/|max:255|min:3',
            'supplier_email' => 'sometimes|email|regex:/(.*@.{2,}\..{2,3})$/',
            'supplier_phone' => 'sometimes|numeric|regex:/^[0-9]+$/',
            'supplier_status' => 'sometimes|in:Activo,Inactivo'
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        $supplier = Supplier::find($id);

        if ($supplier === null) {
            return response()->json(["msg" => "El proveedor no existe"], 400);
        }

        try {
            if ($request->has('supplier_name') ||
                $request->has('supplier_email') ||
                $request->has('supplier_phone') ||
                $request->has('supplier_status')){
                if ($request->has('supplier_name')) {
                    $supplier->supplier_name = $request->supplier_name;
                }
                if ($request->has('supplier_email')) {
                    $supplier->supplier_email = $request->supplier_email;
                }
                if ($request->has('supplier_phone')) {
                    $supplier->supplier_phone = $request->supplier_phone;
                }
                if ($request->has('supplier_status')) {
                   if ($request->supplier_status==='Activo') {
                       $supplier->supplier_status = 1;
                   }
                    if ($request->supplier_status === 'Inactivo') {
                        $supplier->supplier_status = 0;
                    }
                }

                $data = $request->supplier_name . " " . $request->supplier_email . " " . $request->supplier_phone . " " . $request->supplier_status;
                $supplier->save();
LogHistoryController::store($request, 'suppliers', $data, UsersController::getUserIdFromToken($request->header('authorization')));
                return response()->json(["msg" => "Registro actualizado correctamente"], 200);
            }
            return response()->json(["msg" => "No se ha actualizado ningún campo"], 400);
        }catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar el proveedor", "Error" => $e], 500);
        }
    }

    public function updateSupplierStatus(Request $request, $id)
    {
        return $this->updateStatus($request, 'suppliers', $id, 'supplier_status');
    }
}
