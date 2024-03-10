<?php

namespace App\Http\Controllers;

use App\Models\Order_Detail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class OrderDetailsController extends Controller
{
    //
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'quantity'=>'required|numeric|regex:/^[0-9]+$/',
            'pirce'=>'required|double',
            'status'=>'required|string',
            'customer_id'=> 'required|numeric|regex:/^[0-9]+$/',
            'delery_date'=> 'required|date',
            'model_id'=> 'required|numeric|regex:/^[0-9]+$/',
            'order_id'=> 'required|numeric|regex:/^[0-9]+$/',
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $orderdetails = new Order_Detail();
        $orderdetails->quantity = $request->quantity;
        $orderdetails->price = $request->price;
        $orderdetails->status = $request->status;
        $orderdetails->customer_id = $request->customer_id;
        $orderdetails->delivery_date = $request->delivery_date;
        $orderdetails->model_id = $request->model_id;
        $orderdetails->order_id = $request->order_id;
        
        try{
            $orderdetails->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }

        return response()->json([
            "msg" => "Registro correcto"
        ],201);
    }
}
