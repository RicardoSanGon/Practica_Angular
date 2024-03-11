<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class BillsController extends Controller
{
    //
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'detail_id'=> 'required|numeric|regex:/^[0-9]+$/',
            'total_amount'=> 'required|double',
            'tax_amount'=> 'required|double',
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $bill = new Bill();
        $bill->detail_id=$request->detail_id;
        $bill->total_amount=$request->total_amount;
        $bill->tax_amount=$request->tax_amount;
        
        try{
            $bill->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }

        return response()->json([
            "msg" => "Registro correcto"
        ],201);
    }
}
