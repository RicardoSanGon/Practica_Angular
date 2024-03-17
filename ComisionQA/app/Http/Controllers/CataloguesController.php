<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Catalogue;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\LogHistoryController;

class CataloguesController extends Controller
{
    //

    public function index(Request $request)
    {
        try {
            $userId = UsersController::getUserIdFromToken($request->header('authorization'));
            
            $catalogues = Catalogue::all();

            $user = User::find($userId);
            if ($user->role_id == 2 || $user->role_id == 3) {
                $catalogues = Catalogue::where('status', true)->get();
            }

            $catalogues = $catalogues->map(function ($catalogue) {
                return [
                    "id" => $catalogue->id,
                    "name" => $catalogue->name,
                    "status" => $catalogue->status ? "Activo" : "Inactivo"
                ];
            });

            LogHistoryController::store($request, 'catalogues', $request->all(), $userId);
            return response()->json(['data' => $catalogues], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo obtener la lista de catálogos", "error" => $e], 500);
        }
    }
    public function store(Request $request){
        $validaciones = Validator::make($request->all(),[
            "name"=> 'required|min:3|max:50|alpha',
        ]);

        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }

        $catalogue = new Catalogue();
        $catalogue->name=$request->name;

        try{
            $catalogue->save();
            LogHistoryController::store($request, 'catalogues', $request->all());
        }
        catch(Exception $e){
            return response()->json($e,400);
        }

        return response()->json([
            "msg" => "Registro correcto"
        ],201);
    }

    public function modifyCatalogues(Request $request){
        $user = Catalogue::find($request->header('authorization'));
        if($user->role_id==1){

            return response()->json([
                "permission" => true
            ],202);
        }

        return response()->json([
                "permission" => false
            ],401);

    }


    public function getBrands($id)
    {
        $brands = Brand::where('catalogue_id', $id)->get();
        $brands = $brands->map(function ($brand) {
            return [
                "id" => $brand->id,
                "brand_name" => $brand->brand_name,
            ];
        });
        return response()->json(['data' => $brands], 200);
    }

    public function update(Request $request, $id)
    {
        $validaciones = Validator::make($request->all(), [
            "name" => 'sometimes|required|min:3|max:50|alpha',
            "status" => 'sometimes|required|in:Activo,Inactivo'
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        try {

            if($request->has('name') || $request->has('status')){
                $catalogue = Catalogue::findOrFail($id);
                if ($request->has('name')) {
                    $catalogue->name = $request->name;
                }
                if ($request->has('status')) {
                    if ($request->status === "Activo")
                        $catalogue->status = true;
                    if ($request->status === "Inactivo")
                        $catalogue->status = false;
                }
                $catalogue->save();
                LogHistoryController::store($request, 'catalogues', $request->all());
                return response()->json(["msg" => "Catálogo actualizado correctamente"], 200);
            }
            return response()->json(["msg" => "No se pudo actualizar el catálogo"], 400);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar el catálogo", "Error" => $e], 500);
        }

    }

    public function updateCatalogueStatus(Request $request, $id)
    {
        $validaciones = Validator::make($request->all(), [
            "status" => 'required|boolean',
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        try {
            $catalogue = Catalogue::findOrFail($id);
            $catalogue->status = $request->status;
            $catalogue->save();
            LogHistoryController::store($request, 'catalogues', $request->all());

            return response()->json(["msg" => "Catálogo actualizado correctamente"], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar el catálogo", "Error" => $e], 500);
        }
    }
}
