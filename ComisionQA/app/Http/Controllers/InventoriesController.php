<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Supplier;
use App\Models\User;
use App\Models\Vehicle_Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;
use App\Http\Controllers\LogHistoryController;
use App\Http\Controllers\UsersController;


class InventoriesController extends Controller
{
    public function index(Request $request){
        $userId = UsersController::getUserIdFromToken($request->header('authorization'));
        $inventories = Inventory::all();
        $inventories = $inventories->map(function($inventory){
            return[
                "id"=>$inventory->id,
                "admission_date"=>$inventory->admission_date,
                "stock"=>$inventory->stock,
                "vehicle_model_id"=>$inventory->models->model_name,
                "supplier_id"=>$inventory->supplier->supplier_name,
            ];
        });
        $query = Inventory::query();
        $sql = $query->toSql();
        $bindings = $query->getBindings();
        foreach ($bindings as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql = preg_replace('/\?/', $value, $sql, 1);
        }
        LogHistoryController::store($request, 'inventories', $sql, $bindings, $userId);
        return response()->json(['data'=>$inventories], 200);
    }
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'admission_date'=>'required|after_or_equal:today|date_format:Y-m-d',
            'stock'=>'required|integer|min:10',
            'model_id'=> 'required|numeric|regex:/^[0-9]+$/',
            'supplier_id'=> 'required|numeric|regex:/^[0-9]+$/',
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $model=Vehicle_Model::find($request->model_id);
        if(!$model){
            return response()->json(["model_id"=>"El modelo no existe"],400);
        }
        $supplier=Supplier::where('id',$request->suppier_id);
        if(!$supplier){
            return response()->json(["supplier_id"=>"El proveedor no existe"],400);
        }
        $inventory = new Inventory();
        $inventory->admission_date = $request->admission_date;
        $inventory->stock = $request->stock;
        $inventory->vehicle_model_id = $request->model_id;
        $inventory->supplier_id = $request->supplier_id;

        try{
            $inventory->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }

        LogHistoryController::store($request, 'inventories', $request->all());
        return response()->json([
            "msg" => "Registro correcto"
        ],201);
    }

    public function showTableAndForm(Request $request){
       $user=User::findOrfail(UsersController::getUserIdFromToken($request->header('authorization')));
        if($user->role_id==1)
           return response()->json(["permission"=>true],200);
        return response()->json(["permission"=>false], 401);
    }

    public function update(Request $request, $id)
    {
        $validaciones = Validator::make($request->all(), [
            'admission_date' => 'sometimes|required|after_or_equal:today',
            'stock' => 'sometimes|required|integer|min:10',
            'vehicle_model_id' => 'sometimes|required|numeric|regex:/^[0-9]+$/',
            'supplier_id' => 'sometimes|required|numeric|regex:/^[0-9]+$/',
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        try {
            $inventory = Inventory::findOrFail($id);
            $data='';
            if ($request->has('admission_date')) {
                $inventory->admission_date = $request->admission_date;

            }
            $data=$request->admision_date.', ';

            if ($request->has('stock')) {
                $inventory->stock = $request->stock;

            }
            $data.=$request->stock.', ';
            if ($request->has('vehicle_model_id')) {
                $model = Vehicle_Model::find($request->vehicle_model_id);
                if (!$model) {
                    return response()->json(["msg" => "El modelo no existe"], 400);
                }
                $inventory->vehicle_model_id = $request->vehicle_model_id;

            }
            $data.=$request->vehicle_model_id.', ';

            if ($request->has('supplier_id')) {
                $supplier = Supplier::find($request->supplier_id);
                if (!$supplier) {
                    return response()->json(["msg" => "El proveedor no existe"], 400);
                }
                $inventory->supplier_id = $request->supplier_id;

            }
            $data.=$request->supplier_id.', ';

            $inventory->save();

            LogHistoryController::store($request, 'inventories', $data, UsersController::getUserIdFromToken($request->header('authorization')));
            return response()->json(["msg" => "Inventario actualizado correctamente"], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar el inventario", "Error" => $e], 500);
        }
    }
}
