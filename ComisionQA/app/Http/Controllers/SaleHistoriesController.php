<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Sale_History;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class SaleHistoriesController extends Controller
{
    //
    public function store(Request $request)
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
        $history = new Sale_History();
        $history->sale_date = $request->sale_date;
        $history->total_amount = $request->total_amount;
        $history->quantity = $request->quantity;
        $history->model_id = $request->model_id;
        $history->customer_id = $request->customer_id;
        $history->detail_id = $request->detail_id;
        $data =  $request->sale_date . " " . $request->total_amount . " " . $request->quantity . " " . $request->model_id . " " . $request->customer_id . " " . $request->detail_id;
        try {
            $history->save();
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
        LogHistoryController::store($request, 'sale_histories', $data, UsersController::getUserIdFromToken($request->header('authorization')));
        return response()->json([
            "msg" => "Registro correcto"
        ], 201);
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

        $data= $request->sale_date . " " . $request->total_amount . " " . $request->quantity . " " . $request->model_id . " " . $request->customer_id . " " . $request->detail_id;
        try {
            $history->save();
            LogHistoryController::store($request, 'sale_histories', $data, UsersController::getUserIdFromToken($request->header('authorization')));
            return response()->json(["msg" => "Registro actualizado correctamente"], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar el historial de venta", "Error" => $e], 500);
        }
    }

    /*public function index(Request $request)
    {
        $user=User::find(UsersController::getUserIdFromToken($request->header('authorization')));
        $query = User::find(UsersController::getUserIdFromToken($request->header('authorization')));
        $sql = $query->toSql();
        $bindings = $query->getBindings();
        foreach ($bindings as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql = preg_replace('/\?/', $value, $sql, 1);
        }
        if($user->role_id==1) {
            $sales = Sale_History::all();
            $query2 = Sale_History::all();
            $sql2 = $query2->toSql();
            $bindings2 = $query2->getBindings();
            foreach ($bindings2 as $binding) {
                $value = is_numeric($binding) ? $binding : "'".$binding."'";
                $sql2 = preg_replace('/\?/', $value, $sql2, 1);
            }
            $sales = $sales->map(function ($sales) {
                return [
                    "id" => $sales->id,
                    "sale_date" => $sales->sale_date,
                    "total_amount" => $sales->total_amount,
                    "quantity" => $sales->quantity,
                    "vehicle_model" => $sales->model->model_name,
                    "customer" => $sales->customer->user->name,
                    "detail_id" => $sales->detail_id,
                ];
            });
            $consulta=$sql.' '.$sql2;
            LogHistoryController::store($request,'sale_histories',$consulta,UsersController::getUserIdFromToken($request->header('authorization')));
            return response()->json(['data' => $sales], 200);
        }
        if ($user->role_id == 2) {
            $customer = Customer::where('user_id', $user->id)->first();
            $query2 = Customer::where('user_id', $user->id);
            $sql2 = $query2->toSql();
            $bindings2 = $query2->getBindings();
            foreach ($bindings2 as $binding) {
                $value = is_numeric($binding) ? $binding : "'".$binding."'";
                $sql2 = preg_replace('/\?/', $value, $sql2, 1);
            }
            $sales = Sale_History::where('customer_id', $customer->id)->get();
            $query3 = Sale_History::where('customer_id', $customer->id);
            $sql3 = $query3->toSql();
            $bindings3 = $query3->getBindings();
            foreach ($bindings3 as $binding) {
                $value = is_numeric($binding) ? $binding : "'".$binding."'";
                $sql3 = preg_replace('/\?/', $value, $sql3, 1);
            }
            $sales = $sales->map(function ($sales) {
                return [
                    "id" => $sales->id,
                    "sale_date" => $sales->sale_date,
                    "total_amount" => $sales->total_amount,
                    "quantity" => $sales->quantity,
                    "vehicle_model" => $sales->model->model_name,
                    "detail_id" => $sales->detail_id,
                ];
            });
            $consultas=$sql.' '.$sql2.' '.$sql3;
            LogHistoryController::store($request,'sale_histories',$consultas,UsersController::getUserIdFromToken($request->header('authorization')));
            return response()->json(['data' => $sales], 200);
        }
        return response()->json(['msg' => 'No tienes permisos para ver los historiales de venta'], 401);
    }*/

    public function index(Request $request)
{
    $userId = UsersController::getUserIdFromToken($request->header('authorization'));
    $sales = Sale_History::all();
    
    $sales = $sales->map(function ($sale) {
        return [
            "id" => $sale->id,
            "sale_date" => $sale->sale_date,
            "total_amount" => $sale->total_amount,
            "quantity" => $sale->quantity,
            "vehicle_model" => $sale->model->model_name,
            "customer" => $sale->customer->user->name,
            "detail_id" => $sale->detail_id,
        ];
    });

    $query = Sale_History::query();
    $sql = $query->toSql();
    $bindings = $query->getBindings();
    foreach ($bindings as $binding) {
        $value = is_numeric($binding) ? $binding : "'" . $binding . "'";
        $sql = preg_replace('/\?/', $value, $sql, 1);
    }

    LogHistoryController::store($request, 'sale_histories', $sql, $bindings, $userId);
    
    return response()->json(['data' => $sales], 200);
}

}
