<?php



namespace App\Http\Controllers;
use App\Models\User;
use App\Mail\SendCode;
use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Exception;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use stdClass;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Mail\VerificacionEmail;

class UsersController extends Controller
{

    public function index(Request $request)
    {
        $users = User::all();
        $query = User::query();
        $sql = $query->toSql();
        $users=$users->map(function($user){
            return[
                "id"=>$user->id,
                "name"=>$user->name,
                "email"=>$user->email,
                "rol"=>$user->role->rol,
                "status"=>$user->status?"Activo":"Inactivo",
            ];
        });
        LogHistoryController::store($request,'users',$sql,UsersController::getUserIdFromToken($request->header('Authorization')));
        return response()->json(['data'=>$users], 200);
    }


    public function store(Request $request)
    {
        $validaciones=Validator::make($request->all(),[
            'name'=>'required|string|alpha|max:255|min:3',
            'email'=>'required|email|unique:users|regex:/(.*@.{2,}\..{2,3})$/',
            'password'=>'required|string|min:8|max:255'
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $user = new User();
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=Hash::make($request->password);
        $user->role_id=3;
        $data=$request->name." ".$request->email." ".Hash::make($request->password);
        try{
            $user->save();
        }catch(Exception $e){
            return response()->json($e,400);
        }
        $token=JWTAuth::fromUser($user);
        $url=URL::temporarySignedRoute('verificar',now()->addMinutes(30),['token'=>$token]);
        Mail::to($request->email)->send(new VerificacionEmail($request->name,$url));
        LogHistoryController::store($request,'users',$data,$user->id);
        return response()->json(["msg"=>"Registro Correcto"],201);
    }

    public function log_in(Request $request)
    {
        $validaciones=Validator::make($request->all(),[
            'email'=>'required|email|regex:/(.*@.{2,}\..{2,3})$/',
            'password'=>'required|string|max:255'
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $user=User::where('email',$request->email)->first();
        if(!$user){
            return response()->json(['msg'=>'El usuario no existe'],404);
        }
        if($user->status==0){
            return response()->json(['msg'=>'El usuario no ha verificado su correo'],400);
        }
        $credentials = $request->only('email', 'password');
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['msg' => 'credenciales invalidas'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['msg' => 'no se pudo crear el token'], 500);
        }
        $code=random_int(100000,999999);
        $user=User::where('email',$request->email)->first();
        $user->code=Hash::make($code);
        $user->save();
        Mail::to($request->email)->send(new SendCode($user->name,$code));
        $data=$request->email.', '.Hash::make($request->password);

        LogHistoryController::store($request,'users',$data,$user->id);
        return response()->json(['token'=>$token,
            'msg'=>'Inicio de sesion correcto, se le ha enviado un correo con un codigo de verificacion'],202);
    }

    public function logout(Request $request)
    {
        try {
            $userId = self::getUserIdFromToken($request->header('Authorization'));
            $user = User::find($userId);
            if (!$user) {
                return response()->json(['msg' => 'User not found'], 404);
            }
            JWTAuth::invalidate($request->header('Authorization'));
            $user->is_code_verified = false;
            $user->save();
            $data=$user->is_code_verified;
            LogHistoryController::store($request,'users',$data,$user->id);
            return response()->json(['msg' => 'Sesion cerrada'], 200);
        } catch (JWTException $e) {
            return response()->json(['msg' => 'Could not close the session'], 500);
        }
    }

    public function codeverification(Request $request)
    {
        $validaciones=Validator::make($request->all(),[
            'code'=>'required|integer|digits:6'
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $user=User::findOrFail(self::getUserIdFromToken($request->header('Authorization')));
        if(Hash::check($request->code,$user->code)){
            $token=JWTAuth::fromUser($user);
            $user->is_code_verified=true;
            $user->save();
            $data=$request->code;
            LogHistoryController::store($request,'users',$data,$user->id);
            return response()->json(["msg"=>"Verificacion Correcta","token"=>$token],200);
        }
        return response()->json(["msg"=>"Codigo incorrecto"],400);
    }

    public function verification_email(Request $request,$token)
    {
        if($token) {
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $user->status = 1;
                $user->save();
                $data=$user->status;
                LogHistoryController::store($request,'users',$data,$user->id);
                return view('email_activated');
            } catch (Exception $e) {
                return view('email_activation_error');
            }
        }
        else
            {
                return view('email_activation_error');
            }
    }

    public static function getUserIdFromToken($authorizationHeader) {
        try {
            if (substr($authorizationHeader, 0, 7) !== 'Bearer ') {
                return response()->json(['msg' => 'Token not provided'], 401);
            }

            $token = substr($authorizationHeader, 7);
            $payload = JWTAuth::setToken($token)->getPayload();
            $data=$authorizationHeader;
        } catch (JWTException $e) {
            return response()->json(['msg' => 'Invalid token']);
        }

        return $payload['sub'];
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            if($request->has('status')) {
                if($request->status==='Activo'){
                    $user->status = 1;
                } 
                if($request->status==='Inactivo'){
                    $user->status = 0;
                }
            }
            if($request->has('rol'))
                $user->role_id = $request->rol;
            $user->save();
            $data=$request->status." ".$request->rol;
            LogHistoryController::store($request,'users',$data,self::getUserIdFromToken($request->header('Authorization')));
            return response()->json(["msg" => "Actualización Correcta"], 200);
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
    }

    public function delete(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->status = false;
            $user->save();

            return response()->json(["msg" => "Usuario desactivado correctamente"], 200);
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
    }

    public function showUsersTable(Request $request)
    {
        $user=User::findOrFail(self::getUserIdFromToken($request->header('Authorization')));
        if($user->role_id==1){
            $data=$user->role_id;
            LogHistoryController::store($request,'users',$data,$user->id);
            return response()->json(['permission'=>true],200);
        }
        $data=$user->role_id;
        LogHistoryController::store($request,'users',$data,$user->id);
        return response()->json(['permission'=>false],401);
    }

    public function updateUserStatus(Request $request, $id)
    {
        return $this->updateStatus($request, 'users', $id, 'status');
    }

    public function is_admin(Request $request){
        $user=User::findOrFail(self::getUserIdFromToken($request->header('Authorization')));
        if($user->role_id==1){
            $data=$user->role_id;
            LogHistoryController::store($request,'users',$data,$user->id);
            return response()->json(['is_admin'=>true],200);
        }
        $data=$user->role_id;
        LogHistoryController::store($request,'users',$data,$user->id);
        return response()->json(['is_admin'=>false],200);
    }
    public function is_guest(Request $request){
        $user=User::findOrFail(self::getUserIdFromToken($request->header('Authorization')));
        if($user->role_id==3){
            $data=$user->role_id;
            LogHistoryController::store($request,'users',$data,$user->id);
            return response()->json(['is_guest'=>true],200);
        }
        $data=$user->role_id;
        LogHistoryController::store($request,'users',$data,$user->id);
        return response()->json(['is_guest'=>false],200);
    }

    public function is_client(Request $request){
        $user=User::findOrFail(self::getUserIdFromToken($request->header('Authorization')));
        $query = User::findOrfail($user->id);
        $sql = $query->toSql();
        $bindings = $query->getBindings();
        foreach ($bindings as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql = preg_replace('/\?/', $value, $sql, 1);
        }

        if(!$user){
            LogHistoryController::store($request,'users',$sql,$user->id);
            return response()->json(['is_client'=>false],200);
        }
        $customer=Customer::where('user_id',$user->id)->first();
        $query2 = Customer::where('user_id',$user->id);
        $sql2 = $query2->toSql();
        $bindings2 = $query2->getBindings();
        foreach ($bindings2 as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql2 = preg_replace('/\?/', $value, $sql2, 1);
        }
        if($customer!=null){
            LogHistoryController::store($request,'users',$sql.' '.$sql2,$user->id);
            return response()->json(['is_client'=>true],200);
        }
        LogHistoryController::store($request,'users',$sql.' '.$sql2,$user->id);
        return response()->json(['is_client'=>false],200);
    }
    public function is_user(Request $request){
        $user=User::findOrFail(self::getUserIdFromToken($request->header('Authorization')));
        $query = User::findOrfail($user->id);
        $sql = $query->toSql();
        $bindings = $query->getBindings();
        foreach ($bindings as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql = preg_replace('/\?/', $value, $sql, 1);
        }
        if($user->role_id==2){
            LogHistoryController::store($request,'users',$sql,$user->id);
            return response()->json(['is_user'=>true],200);
        }
        LogHistoryController::store($request,'users',$sql,$user->id);
        return response()->json(['is_user'=>false],200);
    }
    public function is_Auth(Request $request){

        try
        {
            if (!$request->hasHeader('Authorization')) {
                return response()->json(['is_Auth'=>false],200);
            }
            $token = JWTAuth::getToken();
            $user = JWTAuth::setToken($token)->authenticate();
            return response()->json(['is_Auth'=>true],200);
        }
        catch (Exception $e){
            return response()->json(['is_Auth'=>false],200);
        }

    }

    public function is_Code_Verified(Request $request){
        $user=User::findOrFail(self::getUserIdFromToken($request->header('Authorization')));
        $query = User::findOrfail($user->id);
        $sql = $query->toSql();
        $bindings = $query->getBindings();
        foreach ($bindings as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql = preg_replace('/\?/', $value, $sql, 1);
        }
        if($user->is_code_verified){
            LogHistoryController::store($request,'users',$sql,$user->id);
            return response()->json(['is_Code_Verified'=>true],200);
        }
        LogHistoryController::store($request,'users',$sql,$user->id);
        return response()->json(['is_Code_Verified'=>false],200);
    }
}

/*
 *      $query = consulta con el modelo
        $sql = $query->toSql();
        $bindings = $query->getBindings();
        foreach ($bindings as $binding) {
            $value = is_numeric($binding) ? $binding : "'".$binding."'";
            $sql = preg_replace('/\?/', $value, $sql, 1);
        }
 */
