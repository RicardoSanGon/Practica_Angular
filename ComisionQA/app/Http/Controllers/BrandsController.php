<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

        $brands = $brands->map(function($brand){
            return[
                "id"=>$brand->id,
                "brand_name"=>$brand->brand_name,
                "brand_status"=>$brand->brand_status ? "Activo":"Inactivo",
                "catalogue_id"=>$brand->catalogue->name,
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
        $catalogue = Catalogue::find($request->catalogue_id);
        if(!$catalogue){
            return response()->json(["catalogue_id"=>"El catalogo no existe"],400);
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

    public function update(Request $request, $id)
    {
        $validaciones = Validator::make($request->all(), [
            "brand_name" => 'sometimes|string|regex:/^[a-zA-Z0-9 ]*$/|max:255|min:3',
            "catalogue_id" => 'sometimes|required|numeric|regex:/^[0-9]+$/',
            "brand_status" => "sometimes|required|in:Activo,Inactivo"
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        try {
            if($request->has('brand_name') || $request->has('catalogue_id') || $request->has('status')){
                $brand = Brand::findOrFail($id);
                if (!$brand) {
                    return response()->json(["msg" => "La marca no existe"], 400);
                }
                if ($request->has('brand_name')) {
                    $brand->brand_name = $request->brand_name;
                }

                if ($request->has('catalogue_id')) {
                    $brand->catalogue_id = $request->catalogue_id;
                }
                if ($request->has('brand_status')) {
                    if ($request->brand_status === "Activo") {
                        $brand->brand_status = true;
                    }
                    if ($request->brand_status === "Inactivo") {
                        $brand->brand_status = false;
                    }
                }
                $brand->save();
                return response()->json(["msg" => "Marca actualizada correctamente"], 200);

            }
            return response()->json(["msg" => "No se ha enviado ningun campo para actualizar"], 400);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar la marca", "Error" => $e], 500);
        }
    }

    public function updateBrandStatus(Request $request, $id)
    {
        return $this->updateStatus($request, 'brands', $id, 'brand_status');
    }
}
