<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Mail\VerificacionEmail;

class UsersController extends Controller
{
    //
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
        try{
            $user->save();
        }catch(Exception $e){
            return response()->json($e,400);
        }
        $token=JWTAuth::fromUser($user);
        $url=URL::temporarySignedRoute('verificar',now()->addMinutes(30),['token'=>$token]);
        Mail::to($request->email)->send(new VerificacionEmail($request->name,$url));
        return response()->json(["msg"=>"Registro Correcto"],201);
    }

    public function log_in(Request $request)
    {
        $validaciones=Validator::make($request->all(),[
            'email'=>'required|email|regex:/(.*@.{2,}\..{2,3})$/',
            'password'=>'required|string|min:8|max:255'
        ]);
        if($validaciones->fails()){
            return response()->json(["Errores"=>$validaciones->errors(),"msg"=>"Error en los datos"],400);
        }
        $credentials = $request->only('email', 'password');
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['msg' => 'credenciales invalidas'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['msg' => 'no se pudo crear el token'], 500);
        }
        return response()->json(['token'=>$token]);
    }

    public function verification_email($token)
    {
        if($token) {
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $user->status = 1;
                $user->save();
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

    public function getUserIdFromToken($authorizationHeader) {
        try {
            if (substr($authorizationHeader, 0, 7) !== 'Bearer ') {
                return response()->json(['msg' => 'Token not provided'], 401);
            }

            $token = substr($authorizationHeader, 7);
            $payload = JWTAuth::setToken($token)->getPayload();
        } catch (JWTException $e) {
            return response()->json(['msg' => 'Invalid token'], $e->getStatusCode());
        }

        return $payload['sub'];
    }
}
