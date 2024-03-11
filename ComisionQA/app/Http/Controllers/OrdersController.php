<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
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
                return response()->json(["msg"=>"El usuario ya tiene una orden en proceso"],400);
            }
        }


        $order = new Order();
        $order->customer_id=$customer->id;
        $order->status='proceso';

        try{
            $order->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }

        return response()->json([
            "msg" => "Order creada"
        ],201);
    }
}
