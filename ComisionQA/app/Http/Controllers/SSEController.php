<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SSEController extends Controller
{
    public function handleSSE()
    {
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');
        header('Connection: keep-alive');
        header('Access-Control-Allow-Origin: *');

        while (true) {
            $data = Customer::all();
            if ($data) {
                $data = $data->map(function ($customer) {
                    return [
                        'id' => $customer->id,
                        'direccion' => $customer->customer_address,
                        'telefono' => $customer->customer_phone,
                        'usuario' => $customer->user->name,
                    ];
                });
                Log::info($data);
                echo "data: " . json_encode($data) . "\n\n";
            } else {
                echo "\n\n";
            }

            ob_flush();
            flush();

            sleep(5);
        }
    }
}
