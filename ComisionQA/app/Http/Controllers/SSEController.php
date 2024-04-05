<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SSEController extends Controller
{
    public function handleSSE($token)
    {

        try{
            header('Content-Type: text/event-stream');
            header('Cache-Control: no-cache');
            header('Connection: keep-alive');
            header('Access-Control-Allow-Origin: http://localhost:4200');
            $id=UsersController::getUserIdFromToken($token);
            $customer = Customer::where('user_id',$id)->first();
            Log::info($customer);
            if($customer)
            {
                $notification = Notification::where('customer_id',$customer->id)
                    ->where('is_send',false)
                    ->first();
                if($notification)
                {
                    echo "data: ".$notification->message."\n\n status: ".$notification->detail_status."\n\n";
                    $notification->is_send = true;
                    $notification->save();
                }
                else
                {
                    echo "data: \n\n";
                }
            }
            else{
                echo "data: \n\n";
            }

        }
        catch (Exception $e)
        {
            echo "Error: " . $e->getMessage();
        }
        ob_flush();
        flush();
    }
}
