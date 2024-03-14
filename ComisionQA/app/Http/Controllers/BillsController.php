<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
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

    public function update(Request $request, $detailId)
    {
        $validaciones = Validator::make($request->all(), [
            'total_amount' => 'required|double',
            'tax_amount' => 'required|double',
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        try {
            $bill = Bill::where('detail_id', $detailId)->first();

            if ($bill) {
                $bill->total_amount = $request->total_amount;
                $bill->tax_amount = $request->tax_amount;
                $bill->save();

                return response()->json(["msg" => "Factura actualizada correctamente"], 200);
            } else {
                return response()->json(["msg" => "No se encontró la factura con el detail_id proporcionado"], 404);
            }
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar la factura", "Error" => $e], 500);
        }
    }

    public function index(Request $request)
    {
        $userId = Auth::id();

        $bills = Bill::where('customer_id', $userId)->get();

        if ($bills->isEmpty()) {
            return response()->json(['msg' => 'No se encontraron facturas para este cliente'], 404);
        }

        $response = [];

        foreach ($bills as $bill) {
            $billDetails = $bill->details()->get();

            $detailsData = [];
            foreach ($billDetails as $detail) {
                $detailsData[] = [
                    'detail_id' => $detail->detail_id,
                    'total_amount' => $detail->total_amount,
                    'tax_amount' => $detail->tax_amount,
                ];
            }

            $response[] = [
                'bill_id' => $bill->id,
                'customer_id' => $bill->customer_id,
                'details' => $detailsData,
            ];
        }

        return response()->json(['data' => $response], 200);
    }
}
