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
            'supplier_phone'=>'required|unique:suppliers|numeric|regex:/^[0-9]+$/',
            'password'=>'required|string|min:8|max:255'
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $supplier = new Supplier();
        $supplier->supplier_name=$request->supplier_name;
        $supplier->supplier_email=$request->supplier_email;
        $supplier->supplier_phone=$request->supplier_phone;
        $supplier->password=Hash::make($request->password);

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
}
