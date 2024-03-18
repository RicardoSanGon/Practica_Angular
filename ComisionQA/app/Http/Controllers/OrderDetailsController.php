<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Order_Detail;
use App\Models\User;
use App\Models\Vehicle_Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrdenAceptadaMail;

class OrderDetailsController extends Controller
{
    public function index(Request $request, $id=null)
{
    $users = User::find(UsersController::getUserIdFromToken($request->header('authorization')));
    if ($users->role_id == 1) {
        $order_details = Order_Detail::all();
        $query=Order_Detail::query();
        $sql=$query->toSql();
        $order_details = $order_details->map(function ($order_detail) {
            return [
                "id" => $order_detail->id,
                "cantidad" => $order_detail->quantity,
                "modelo" => $order_detail->vehicle_model->model_name,
                "orden_id" => $order_detail->order_id,
                "precio_total" => $order_detail->price,
                "status" => $order_detail->status,
                "fecha_de_entrega" => $order_detail->delery_date ?? 'No tiene fecha de entrega',
                "cliente"=>$order_detail->order->customer->user->name
            ];
        });
        LogHistoryController::store($request, 'order_details', $sql, $users->id);
        return response()->json(['data' => $order_details], 200);
    }

    if ($users->role_id == 2) {
        $consulta='';
        $customer = Customer::where('user_id', UsersController::getUserIdFromToken($request->header('authorization')))->first();
        $query=Customer::where('user_id',UsersController::getUserIdFromToken($request->header('authorization')));
        $sql=$query->toSql();
        $bindings = $query->getBindings();
        foreach ($bindings as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql = preg_replace('/\?/', $value, $sql, 1);
        }
        $consulta.=$sql;
        if (!$customer) {
            return response()->json(["msg" => "El usuario no esta registrado como cliente"], 400);
        }
        $ordenes = Order::where('customer_id', $customer->id)->get();
        $query2=Order::where('customer_id',$customer->id);
        $sql2=$query2->toSql();
        $bindings2 = $query2->getBindings();
        foreach ($bindings2 as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql2 = preg_replace('/\?/', $value, $sql2, 1);
        }
        $consulta.=$sql2;
        if ($ordenes->isEmpty()){
            return response()->json(["msg" => "No existen órdenes para este cliente"], 404);
        }

        $all_order_details = collect();

        // Iterar sobre cada orden y obtener los detalles de la orden
        foreach ($ordenes as $orden) {
            $order_details = Order_Detail::where('order_id', $orden->id)->get();
            if(count($order_details)===0){
                continue; // Si no hay detalles de orden, continuar con la siguiente orden
            }
            $order_details = $order_details->map(function ($order_detail) {
                return [
                    "id" => $order_detail->id,
                    "cantidad" => $order_detail->quantity,
                    "modelo" => $order_detail->vehicle_model->model_name,
                    "orden_id" => $order_detail->order_id,
                    "precio_total" => $order_detail->price,
                    "status" => $order_detail->status,
                    "fecha_de_entrega" => $order_detail->delery_date ?? 'No tiene fecha de entrega',
                    "cliente"=>$order_detail->order->customer->user->name
                ];
            });
            $all_order_details = $all_order_details->concat($order_details);
        }
        LogHistoryController::store($request, 'order_details', $consulta, $users->id);
        return response()->json(['data' => $all_order_details], 200);
    }
    if($id===null)
    {
        LogHistoryController::store($request, 'order_details', 'Sin datos', $users->id);
        return response()->json(["msg"=>"No se encuentra la orden"],404);
    }
    return response()->json(["msg" => "No tiene permisos"], 401);
}

    public function store(Request $request)
    {

        $customer = Customer::where('user_id', UsersController::getUserIdFromToken($request->header('authorization')))->first();
        $query=Customer::where('user_id',UsersController::getUserIdFromToken($request->header('authorization')));
        $sql=$query->toSql();
        $bindings = $query->getBindings();
        foreach ($bindings as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql = preg_replace('/\?/', $value, $sql, 1);
        }
        if (!$customer) {
            return response()->json(["msg" => "El usuario no esta registrado como cliente"], 400);
        }
        $order = Order::where('customer_id', $customer->id)->latest('order_date')->first();
        $query2=Order::where('customer_id',$customer->id)->latest('order_date');
        $sql2=$query2->toSql();
        $bindings2 = $query2->getBindings();
        foreach ($bindings2 as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql2 = preg_replace('/\?/', $value, $sql2, 1);
        }
        if ($order === null || $order->status === 'cancelado' || $order->status === 'entregado') {
            return response()->json(["msg" => "El usuario no tiene una orden en proceso"], 400);
        }
        $data = $request->request->all();
        if(count($data)===0 || $data===null){
            return response()->json(["msg" => "El carrito no tiene productos"], 400);
        }
        if ($data !== null) {
            foreach ($data as $detalle) {
                $vehicle_model = Vehicle_model::find($detalle['id']);
                if ($vehicle_model === null) {
                    return response()->json(["msg" => "El modelo no existe"], 400);
                }
                $NewOrderDetail = new Order_Detail();
                $NewOrderDetail->quantity = $detalle['cantidad'];
                $NewOrderDetail->vehicle_model_id = $detalle['id'];
                $NewOrderDetail->order_id = $order->id;
                $NewOrderDetail->price = $vehicle_model->model_price * $detalle['cantidad'];
                $NewOrderDetail->status = 'pendiente';
                try {
                    $NewOrderDetail->save();
                } catch (Exception $e) {
                    return response()->json(["msg" => "No se pudo crear el detalle de orden", "Error" => $e], 500);
                }

            }
            $order->status = 'enviada';
            $order->save();
            $consulta=$sql.' '.$sql2;
            LogHistoryController::store($request, 'order_details, orders, vehicle_models', $consulta, UsersController::getUserIdFromToken($request->header('authorization')));
            return response()->json([
                "msg" => "Registro correcto"
            ], 201);
        }
        return response()->json(["msg" => "No se pudo crear el detalle de orden"], 500);
    }
    public function changeStatusDetail(Request $request, $id)
    {
        $validaciones = Validator::make($request->all(), [
            'status' => 'required|string|in:aceptado,cancelado',
            'delery_date' => 'required|date|after:today'
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        $detail = Order_Detail::find($id);
        $query=Order_Detail::find($id);
        $sql=$query->toSql();
        $bindings = $query->getBindings();
        foreach ($bindings as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql = preg_replace('/\?/', $value, $sql, 1);
        }
        if (!$detail) {
            return response()->json(["msg" => "El detalle no existe"], 400);
        }

        $previousStatus = $detail->status;
        $detail->status = $request->status;

        try {
            if ($previousStatus !== 'aceptado' || $previousStatus !== 'cancelado') {

                $model = Vehicle_Model::where('id', $detail->vehicle_model_id)->first();
                $query2=Vehicle_Model::where('id',$detail->vehicle_model_id);
                $sql2=$query2->toSql();
                $bindings2 = $query2->getBindings();
                foreach ($bindings2 as $binding) {
                    $value = is_numeric($binding) ? $binding : "'".$binding."'";
                    $sql2 = preg_replace('/\?/', $value, $sql2, 1);
                }

                if ($model->model_stock < $detail->quantity) {
                    return response()->json(["msg" => "No hay suficiente stock para aceptar el pedido"], 400);
                }


                $model->model_stock = $model->model_stock - $detail->quantity;
            }
            $detail->delery_date = $request->delery_date;
            $detail->save();
            $model->save();
            $consulta=$sql.' '.$sql2;
            LogHistoryController::store($request, 'order_details, vehicle_models', $consulta, UsersController::getUserIdFromToken($request->header('authorization')));
            return response()->json(["msg" => "Registro correcto"], 201);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo cambiar el estado del detalle", "Error" => $e], 500);
        }
    }
}

