<?php

use App\Http\Controllers\BrandsController;
use App\Http\Controllers\CataloguesController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\InventoriesController;
use App\Http\Controllers\ModelsController;
use App\Http\Controllers\OrderDetailsController;
use App\Http\Controllers\OrdersController;
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


//PRUEBA
Route::put('/edit/{id}', [UsersController::class, 'update']);
Route::delete('/delete/{id}', [UsersController::class, 'delete']);

//Rutas con token
Route::group(['middleware' => 'auth:jwt'], function () {
    Route::get('/users/table/permissions',[UsersController::class,'showUsersTable']);
    Route::post('/verification/code',[UsersController::class,'codeverification']);
    Route::get('/brands',[BrandsController::class,'index']);
    Route::get('/users',[UsersController::class,'index']);
    Route::get('/logout',[UsersController::class,'logout']);
    Route::get('/catalogues',[CataloguesController::class,'index']);
    Route::post('/modify/catalogues',[CataloguesController::class,'modifyCatalogues']);
    Route::get('/models',[ModelsController::class,'index']);
    Route::post('/create/customer',[CustomersController::class,'store']);
    Route::get('/customers/table/permissions',[CustomersController::class,'showCustomersTable']);
    Route::get('/customers',[CustomersController::class,'index']);
    Route::post('/create/order',[OrdersController::class,'store']);
    Route::post('/inventorie/add',[InventoriesController::class,'store']);
    Route::get('/inventorie/permissions',[InventoriesController::class,'showTableAndForm']);
    Route::get('/inventories',[InventoriesController::class,'index']);
    Route::post('/order/details/create',[OrderDetailsController::class,'store']);
    Route::get('/order/details',[OrderDetailsController::class,'index']);
    Route::put('/order/details/status/{id}',[OrderDetailsController::class,'changeStatusDetail']);
    Route::post('/create/brand',[BrandsController::class,'store']);
    Route::post('/create/model',[ModelsController::class,'store']);
    Route::get('/catalogue/brand/{id}',[CataloguesController::class,'getBrands']);
});
