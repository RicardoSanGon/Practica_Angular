<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;
use App\Http\Controllers\UsersController;
use App\Models\User;
use App\Models\Catalogue;
class BrandsController extends Controller
{
    //
    public function index(Request $request){
        $brands = Brand::all();

        $user=User::find(UsersController::getUserIdFromToken($request->header('authorization')));
        if ($user->role_id==2 || $user->role_id==3){
            $brands = Brand::where('brand_status', true)
                ->whereHas('catalogue', function ($query) {
                    $query->where('status', true);
                })->get();
        }
        $brands = $brands->map(function($brand){
            return[
                "id"=>$brand->id,
                "brand_name"=>$brand->brand_name,
                "catalogue"=>$brand->catalogue->name,
                "Status"=>$brand->brand_status ? "Activo" : "Inactivo"
            ];
        });
        return response()->json(['data'=>$brands], 200);
    }
    public function store(Request $request){
        $validaciones = Validator::make($request->all(),[
            "brand_name" => 'required|min:3|string|alpha',
            "catalogue_id" => 'required|numeric|regex:/^[0-9]+$/|min:1'
        ]);

        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=> "Error en los datos"],400);
        }

        $brand = new Brand();
        $brand->brand_name = $request->brand_name;
        $brand->catalogue_id=$request->catalogue_id;

        try{
            $brand->save();
        }
        catch(Exception $e){
            return response()->json($e,400);
        }

        return response()->json([
            "msg" => "Registro correcto"
        ],201);

    }
}
