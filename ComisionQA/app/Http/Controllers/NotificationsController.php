<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Order;
use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    public static function store($order_id,$status){
        $order = Order::find($order_id);

        $notification = new Notification();
        if($status===false)
        {
            $notification->message = 'Su Detalle ha sido rechazado';
        }
        else
        {
            $notification->message = 'Su Detalle ha sido aceptado';
        }
        $notification->customer_id = $order->customer_id;
        $notification->detail_status = $status;
        $notification->save();
    }
}
