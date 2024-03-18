<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Exception;
use App\Models\User;
use App\Http\Controllers\LogHistoryController;

class CustomersController extends Controller
{
    public function index(Request $request){
        $userId = UsersController::getUserIdFromToken($request->header('authorization'));
        $customers = Customer::all();
        $customers = $customers->map(function($customer){
            return[
                "id"=>$customer->id,
                "direccion"=>$customer->customer_address,
                "telefono"=>$customer->customer_phone,
                "usuario"=>$customer->user->name,
                "email"=>$customer->user->email,
            ];
        });
        $query = Customer::query();
            $sql = $query->toSql();
            $bindings = $query->getBindings();
            foreach ($bindings as $binding) {
                $value = is_numeric($binding) ? $binding : "'".$binding."'";
                $sql = preg_replace('/\?/', $value, $sql, 1);
            }
            LogHistoryController::store($request, 'customers', $sql, $bindings, $userId);
        return response()->json(['data'=>$customers], 200);
    }
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'customer_address'=>'required|string|regex:/^[a-zA-Z0-9 ,\-]+$/|max:255|min:3',
            'customer_phone'=>'required|unique:customers|regex:/^[0-9]+$/|max:10|min:10'
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $customer=Customer::where('user_id',UsersController::getUserIdFromToken($request->header('authorization')))->first();
        if($customer){
            return response()->json(["msg"=>"El usuario ya esta registrado como cliente"],400);
        }
        $user_id = UsersController::getUserIdFromToken($request->header('authorization'));
        $Newcustomer = new Customer();
        $Newcustomer->customer_address=$request->customer_address;
        $Newcustomer->customer_phone=$request->customer_phone;
        $Newcustomer->user_id = $user_id;
        $data=$request->customer_address.", ".$request->customer_phone.", ".$user_id;
        try{
            $Newcustomer->save();
            LogHistoryController::store($request, 'customers', $data, $user_id);
        }
        catch(Exception $e){
            return response()->json($e,500);
        }

        return response()->json([
            "msg" => "Registro correcto"
        ],201);
    }

    public function getCurrentCustomer(Request $request){
        $customer=Customer::where('user_id',UsersController::getUserIdFromToken($request->header('authorization')))->first();
        $query = Customer::where('user_id',UsersController::getUserIdFromToken($request->header('authorization')));
        $sql = $query->toSql();
        $bindings = $query->getBindings();
        foreach ($bindings as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql = preg_replace('/\?/', $value, $sql, 1);
        }
        if($customer){
            LogHistoryController::store($request, 'customers', $sql,UsersController::getUserIdFromToken($request->header('authorization')));
            return response()->json($customer,200);
        }
        return response()->json(["msg"=>"El usuario no es cliente"],400);
    }


    public function showCustomersTable(Request $request){
       $user=User::findOrfail(UsersController::getUserIdFromToken($request->header('authorization')));
        if($user->role_id==1)
           return response()->json(["permission"=>true],200);
       return response()->json(["permission"=>false], 401);
    }

    public function update(Request $request)
    {
        $customer = Customer::where('user_id',UsersController::getUserIdFromToken($request->header('Authorization')))->first();
        $validaciones = Validator::make($request->all(), [
            'customer_address' => 'sometimes|required|string|regex:/^[a-zA-Z0-9 ,\-]+$/|max:255|min:3',
            'customer_phone' => 'sometimes|required|unique:customers,customer_phone,'.$customer->id.'|string|regex:/^[0-9]+$/|max:10|min:10'
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        try {

            $data = $customer->customer_address.", ".$customer->customer_phone;
            if ($request->has('customer_address')) {
                $customer->customer_address = $request->customer_address;
            }

            if ($request->has('customer_phone')) {
                $customer->customer_phone = $request->customer_phone;
            }

            $customer->save();
            LogHistoryController::store($request, 'customers',$data,UsersController::getUserIdFromToken($request->header('Authorization')));

            return response()->json(["msg" => "Cliente actualizado correctamente"], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar el cliente", "Error" => $e], 500);
        }
    }
}

