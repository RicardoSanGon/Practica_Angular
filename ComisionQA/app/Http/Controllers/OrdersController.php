<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class OrdersController extends Controller
{
    //
    public function store(Request $request){

        $customer=Customer::where('user_id',UsersController::getUserIdFromToken($request->header('authorization')))->first();

        if(!$customer){
            return response()->json(["msg"=>"El usuario no esta registrado como cliente"],400);
        }
        $orden = Order::where('customer_id',$customer->id)->latest('order_date')->first();
        if($orden!==null && $orden->status!==null){
            if ($orden->status==='proceso'){
                return response()->json(["msg"=>"Ya hay una orden en proceso"],400);
            }
        }
        $order = new Order();
        $order->customer_id=$customer->id;
        $order->order_date=Carbon::now('America/Monterrey')->toDateTimeString();
        $order->status='proceso';
        $data= $customer->id.' '.$order->order_date.' '.$order->status;
        try{
            $order->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }
        LogHistoryController::store($request,'orders',$data,UsersController::getUserIdFromToken($request->header('authorization')));

        return response()->json([
            "msg" => "Order creada"
        ],201);
    }

    public function update(Request $request, $id)
    {
        $validaciones = Validator::make($request->all(), [
            'status' => 'required|in:proceso,enviada,cancelada',
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        $order = Order::find($id);

        if ($order === null) {
            return response()->json(["msg" => "La orden no existe"], 400);
        }

        $order->status = $request->status;
        $data = $request->status;
        try {
            $order->save();
            LogHistoryController::store($request, 'orders', $data, UsersController::getUserIdFromToken($request->header('authorization')));
            return response()->json(["msg" => "Orden actualizada correctamente"], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar la orden", "Error" => $e], 500);
        }
    }

    public function index(Request $request)
    {
        $user=User::find(UsersController::getUserIdFromToken($request->header('authorization')));
        if ($user->role_id===1) {
            $orders = Order::all();
            return response()->json(['data' => $orders], 200);
        }
        if ($user->role_id===2) {
            $customer=Customer::where('user_id',$user->id)->first();
            $orders = Order::where('customer_id',$customer->id)->get();
            return response()->json(['data' => $orders], 200);
        }

        return response()->json(['data' => []], 200);
    }
}
