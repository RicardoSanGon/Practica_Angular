<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;

class UsersController extends Controller
{
    //
    public function store(Request $request)
    {
        try {
            $this->validate($request, [
                'name' => 'required|max:50',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6|'
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'status' => false,
            ]);

            return response()->json([
                'user' => $user,
                'msg' => "Usuario creado exitosamente"
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "msg" => $e->getMessage(),
            ], 422);
        }
    }
}
