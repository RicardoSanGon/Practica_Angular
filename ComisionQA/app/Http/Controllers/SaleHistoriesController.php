<?php

namespace App\Http\Controllers;

use App\Models\Sale_History;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class SaleHistoriesController extends Controller
{
    //
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'sale_date'=>'required|date',
            'total_amount'=>'required|double',
            'quantity'=> 'required|numeric|regex:/^[0-9]+$/',
            'model_id'=> 'required|numeric|regex:/^[0-9]+$/',
            'customer_id'=> 'required|numeric|regex:/^[0-9]+$/',
            'detail_id'=> 'required|numeric|regex:/^[0-9]+$/',
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $history = new Sale_History();
        $history->sale_date=$request->sale_date;
        $history->total_amount=$request->total_amount;
        $history->quantity=$request->quantity;
        $history->model_id=$request->model_id;
        $history->customer_id=$request->customer_id;
        $history->detail_id=$request->detail_id;
        
        try{
            $history->save();
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
            'sale_date' => 'required|date',
            'total_amount' => 'required|double',
            'quantity' => 'required|numeric|regex:/^[0-9]+$/',
            'model_id' => 'required|numeric|regex:/^[0-9]+$/',
            'customer_id' => 'required|numeric|regex:/^[0-9]+$/',
            'detail_id' => 'required|numeric|regex:/^[0-9]+$/',
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        $history = Sale_History::find($id);

        if ($history === null) {
            return response()->json(["msg" => "El historial de venta no existe"], 400);
        }

        $history->sale_date = $request->sale_date;
        $history->total_amount = $request->total_amount;
        $history->quantity = $request->quantity;
        $history->model_id = $request->model_id;
        $history->customer_id = $request->customer_id;
        $history->detail_id = $request->detail_id;

        try {
            $history->save();

            return response()->json(["msg" => "Registro actualizado correctamente"], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar el historial de venta", "Error" => $e], 500);
        }
    }

    public function index()
    {
        $sales = Sale_History::all();
        $sales = $sales->map(function ($sales) {
            return [
                "id" => $sales->id,
                "sale_date" => $sales->sale_date,
                "total_amount" => $sales->total_amount,
                "quantity" => $sales->quantity,
                "vehicle_model_id" => $sales->vehicle_model_id,
                "customer_id" => $sales->customer_id,
                "detail_id" => $sales->detail_id,
            ];
        });
        return response()->json(['data' => $suppliers], 200);
    }
}
