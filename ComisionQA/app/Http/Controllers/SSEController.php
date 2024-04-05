<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class SSEController extends Controller
{
    public function handleSSE($token)
    {
        try{
            header('Content-Type: text/event-stream');
            header('Cache-Control: no-cache');
            header('Connection: keep-alive');
            header('Access-Control-Allow-Origin: http://localhost:4200');
            $user=JWTAuth::parseToken()->authenticate($token);
            Log::info($user);
            $customer = Customer::where('user_id',$user->id)->first();
            if($customer)
            {
                $notification = Notification::where('customer_id',$customer->id)
                    ->where('is_send',false)
                    ->first();
                if($notification)
                {
                    $data = [
                        'message' => $notification->message,
                        'detail_status' => $notification->detail_status
                    ];
                    echo "data: ".json_encode($data)."\n\n";
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
