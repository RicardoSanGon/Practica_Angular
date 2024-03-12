<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;
use App\Http\Controllers\UsersController;
use App\Models\User;
class CustomersController extends Controller
{
    public function index(){
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
        return response()->json(['data'=>$customers], 200);
    }
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'customer_address'=>'required|string|regex:/^[a-zA-Z0-9 ,\-]+$/|max:255|min:3',
            'customer_phone'=>'required|unique:customers|string|regex:/^[0-9]+$/|max:10|min:10'
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $customer=Customer::where('user_id',UsersController::getUserIdFromToken($request->header('authorization')))->first();
        if($customer){
            return response()->json(["msg"=>"El usuario ya esta registrado como cliente"],400);
        }
        $Newcustomer = new Customer();
        $Newcustomer->customer_address=$request->customer_address;
        $Newcustomer->customer_phone=$request->customer_phone;
        $Newcustomer->user_id = UsersController::getUserIdFromToken($request->header('authorization'));
        try{
            $Newcustomer->save();
        }
        catch(Exception $e){
            return response()->json($e,500);
        }

        return response()->json([
            "msg" => "Registro correcto"
        ],201);
    }


    public function showCustomersTable(Request $request){
       $user=User::findOrfail(UsersController::getUserIdFromToken($request->header('authorization')));
        if($user->role_id==1)
           return response()->json(["permission"=>true],200);
       return response()->json(["permission"=>false], 401);
    }

    public function update(Request $request, $id)
    {
        $validaciones = Validator::make($request->all(), [
            'customer_address' => 'sometimes|required|string|regex:/^[a-zA-Z0-9 ,\-]+$/|max:255|min:3',
            'customer_phone' => "sometimes|required|unique:customers,customer_phone,$id|string|regex:/^[0-9]+$/|max:10|min:10"
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        try {
            $customer = Customer::findOrFail($id);

            if ($request->has('customer_address')) {
                $customer->customer_address = $request->customer_address;
            }

            if ($request->has('customer_phone')) {
                $customer->customer_phone = $request->customer_phone;
            }

            $customer->save();

            return response()->json(["msg" => "Cliente actualizado correctamente"], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar el cliente", "Error" => $e], 500);
        }
    }
}

