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
        $userId = UsersController::getUserIdFromToken($request->header('authorization'));

        $bills = Bill::where('customer_id', $userId)->get();

        if ($bills->isEmpty()) {
            return response()->json(['msg' => 'No se encontraron facturas para este cliente'], 404);
        }

        $bills = $bills->map(function ($bill) {
            return [
                'id' => $bill->id,
                'detail_id' => $bill->detail_id,
                'total_amount' => $bill->total_amount,
                'tax_amount' => $bill->tax_amount,
            ];
        });

        return response()->json(['data' => $bills], 200);
    }
}
