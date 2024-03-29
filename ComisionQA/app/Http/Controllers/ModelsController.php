<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Vehicle_Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;
use App\Http\Controllers\UsersController;
use App\Models\User;

class ModelsController extends Controller
{
    public function index(Request $request){
        $models = Vehicle_Model::all();
        $user=User::find(UsersController::getUserIdFromToken($request->header('authorization')));
        if ($user->role_id==2 || $user->role_id==3){
            $models = Vehicle_Model::where('model_status',true)
                ->whereHas('brand', function($query) use ($user){
                    $query->where('brand_status',true)
                        ->whereHas('catalogue', function($query){
                            $query->where('status',true);
                        });
                })->get();
            $query=Vehicle_Model::where('model_status',true)
                ->whereHas('brand', function($query) use ($user){
                    $query->where('brand_status',true)
                        ->whereHas('catalogue', function($query){
                            $query->where('status',true);
                        });
                });
            $sql=$query->toSql();
            $bindings=$query->getBindings();
            foreach ($bindings as $binding) {
                $value = is_numeric($binding) ? $binding : "'".$binding."'";
                $sql = preg_replace('/\?/', $value, $sql, 1);
            }
            $models = $models->map(function($model){
                return[
                    "id"=>$model->id,
                    "modelo"=>$model->model_name,
                    "year"=>$model->model_year,
                    "descripcion"=>$model->model_description,
                    "precio"=>$model->model_price,
                    "existencias"=>$model->model_stock,
                    "marca"=>$model->brand->brand_name,
                ];
            });
            $is_admin=false;
        }
        else{
            $query=Vehicle_Model::query();
            $sql=$query->toSql();
            $models = $models->map(function($model){
                return[
                    "id"=>$model->id,
                    "modelo"=>$model->model_name,
                    "year"=>$model->model_year,
                    "descripcion"=>$model->model_description,
                    "precio"=>$model->model_price,
                    "existencias"=>$model->model_stock,
                    "marca"=>$model->brand->brand_name,
                    "status"=>$model->model_status ? "Activo" : "Inactivo"
                ];
            });
            $is_admin=true;
        }
        LogHistoryController::store($request,'vehicle_models',$sql,UsersController::getUserIdFromToken($request->header('authorization')));
        return response()->json(['data'=>$models,'is_admin'=>$is_admin], 200);
    }
    public function store(Request $request){
        $validaciones=Validator::make($request->all(),[
            'model_name'=>'required|string|alpha|max:255|min:3',
            'model_year'=>'required|numeric|regex:/^[0-9]+$/|min:2010|max:2030',
            'model_description' => 'required|regex:/^[a-zA-Z\s]+$/|max:255|min:10',
            'model_price'=> 'required|integer|min:50000',
            'model_stock'=>'required|numeric|min:10',
            'brand_id'=> 'required|numeric|regex:/^[0-9]+$/',
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $brand=Brand::find($request->brand_id);
        if($brand==null){
            return response()->json(["model_brand"=>"La marca no existe"],400);
        }
        $modelo = new Vehicle_Model();
        $modelo->model_name=$request->model_name;
        $modelo->model_year=$request->model_year;
        $modelo->model_description=$request->model_description;
        $modelo->model_price = $request->model_price;
        $modelo->model_stock=$request->model_stock;
        $modelo->brand_id=$request->brand_id;
        $data=$request->model_name." ".$request->model_year." ".$request->model_description." ".$request->model_price." ".$request->model_stock." ".$request->brand_id;

        try{
            $modelo->save();
            LogHistoryController::store($request,'vehicle_models',$data,UsersController::getUserIdFromToken($request->header('authorization')));
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
            'model_name' => 'sometimes|required|string|max:255|min:3',
            'model_year' => 'sometimes|required|regex:/^[0-9]+$/|min:4|max:4',
            'model_description' => 'sometimes|required|string|max:255|min:3',
            'model_price' => 'sometimes|required|numeric|regex:/^[0-9]+$/',
            'model_stock' => 'sometimes|required|numeric|regex:/^[0-9]+$/',
            'brand_id' => 'sometimes|required|numeric|regex:/^[0-9]+$/',
        ]);

        if ($validaciones->fails()) {
            return response()->json(["Errores" => $validaciones->errors(), "msg" => "Error en los datos"], 400);
        }

        try {
            $modelo = Vehicle_Model::findOrFail($id);
            $data='';
            if ($request->has('model_name')) {
                $modelo->model_name = $request->model_name;
            }
            $data.=$request->model_name." ";

            if ($request->has('model_year')) {
                $modelo->model_year = $request->model_year;
            }
            $data.=$request->model_year." ";

            if ($request->has('model_description')) {
                $modelo->model_description = $request->model_description;
            }
            $data.=$request->model_description." ";

            if ($request->has('model_price')) {
                $modelo->model_price = $request->model_price;
            }
            $data.=$request->model_price." ";

            if ($request->has('model_stock')) {
                $modelo->model_stock = $request->model_stock;
            }
            $data.=$request->model_stock." ";

            if ($request->has('brand_id')) {
                $modelo->brand_id = $request->brand_id;
            }
            $data.=$request->brand_id.' ';

            if($request->has('model_status')){
                if($request->model_status==='Activo')
                    $modelo->model_status=true;
                else
                    $modelo->model_status=false;
            }
            $data.=$request->model_status;

            $modelo->save();
            LogHistoryController::store($request,'vehicle_models',$data,UsersController::getUserIdFromToken($request->header('authorization')));
            return response()->json(["msg" => "Modelo actualizado correctamente"], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => "No se pudo actualizar el modelo", "Error" => $e], 500);
        }
    }

    public function updateModelStatus(Request $request, $id)
    {
        return $this->updateStatus($request, 'vehicle_models', $id, 'model_status');
    }
}
