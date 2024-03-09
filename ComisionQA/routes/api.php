<?php

use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/create/user',[UsersController::class,'store']);

Route::get('/verificar_email/{token}',[UsersController::class,'verification_email'])
    ->name('verificar')
    ->middleware('signed');

Route::post('/login',[UsersController::class,'log_in']);
