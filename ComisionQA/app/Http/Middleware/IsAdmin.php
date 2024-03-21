<?php

namespace App\Http\Middleware;

use App\Http\Controllers\UsersController;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $users = User::find(UsersController::getUserIdFromToken($request->header('authorization')));
        if ($users->role_id == 1) {
            return $next($request);
        }
        return response()->json(["msg" => "No tienes permisos para realizar esta acción"], 401);
    }
}
