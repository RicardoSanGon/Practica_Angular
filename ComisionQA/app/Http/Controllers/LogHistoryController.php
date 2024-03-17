<?php

namespace App\Http\Controllers;

use App\Models\LogHistory;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogHistoryController extends Controller
{

    public function index()
    {
        $logs = LogHistory::all();
        foreach ($logs as $i => $log) {
            Log::info($log);
        }
        $logs=$logs->map(function($log){
            return [
                "id"=>$log->_id,
                "metodo"=>$log->metodo,
                "ruta"=>$log->ruta,
                "usuario"=>User::where('id',$log->user_id)->first()->name,
                "fecha"=>$log->fecha,
                "tablas"=>$log->tablas,
                "data"=>$log->data
            ];
        });
        return response()->json($logs, 200);
    }


    public static function store(Request $request,$tablas,$data,$id=null){
        try
        {
            $metodo = $request->method();
            $ruta = $request->path();
            $user_id = $id;
            $fecha = Carbon::now('America/Monterrey')->toDateTimeString();
            $log = new LogHistory();
            $log->metodo = $metodo;
            $log->ruta = $ruta;
            $log->user_id = $user_id;
            $log->fecha = $fecha;
            $log->tablas = $tablas;
            $log->data = $data;
            $log->save();
            return true;
        }
        catch (Exception $e)
        {
            return false;
        }
    }
}
