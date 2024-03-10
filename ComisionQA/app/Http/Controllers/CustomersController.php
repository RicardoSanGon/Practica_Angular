<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class CustomersController extends Controller
{
    //
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'customer_address'=>'required|string|alpha|max:255|min:3',
            'customer_phone'=>'required|unique:customers|numeric|regex:/^[0-9]+$/',
            'user_id'=> 'required|numeric|regex:/^[0-9]+$/',
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $customer = new Customer();
        $customer->customer_address=$request->customer_address;
        $customer->customer_phone=$request->customer_phone;
        $customer->user_id = $request->user_id;
        try{
            $customer->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }

        return response()->json([
            "msg" => "Registro correcto"
        ],201);
    }
}
