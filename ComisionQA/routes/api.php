<?php

use App\Http\Controllers\BillsController;
use App\Http\Controllers\BrandsController;
use App\Http\Controllers\CataloguesController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\InventoriesController;
use App\Http\Controllers\LogHistoryController;
use App\Http\Controllers\ModelsController;
use App\Http\Controllers\OrderDetailsController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\RolsController;
use App\Http\Controllers\SaleHistoriesController;
use App\Http\Controllers\SuppliersController;
use App\Http\Controllers\UsersController;
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
    Route::get('/order/details/{id?}',[OrderDetailsController::class,'index']);
    Route::put('/order/details/status/{id}',[OrderDetailsController::class,'changeStatusDetail']);
    Route::post('/create/brand',[BrandsController::class,'store']);
    Route::post('/create/model',[ModelsController::class,'store']);
    Route::get('/catalogue/brand/{id}',[CataloguesController::class,'getBrands']);
    Route::post('/create/supplier',[SuppliersController::class,'store']);
    Route::get('/suppliers',[SuppliersController::class,'index']);
    Route::get('/is_admin',[UsersController::class,'is_admin']);
    Route::get('/is_customer',[UsersController::class,'is_client']);
    Route::get('/is_guest',[UsersController::class,'is_guest']);
    Route::get('/is_user',[UsersController::class,'is_user']);
    Route::get('/orders',[OrdersController::class,'index']);
    Route::get('/rols',[RolsController::class,'index']);
    Route::get('/user/customer',[CustomersController::class,'getCurrentCustomer']);


    Route::get('/bills', [BillsController::class, 'index']);
    Route::get('/history',[SaleHistoriesController::class,'index']);
    Route::get('/is_code_verified',[UsersController::class,'is_Code_Verified']);

    Route::get('/log',[LogHistoryController::class,'index']);


    Route::put('/brand/update/{id}', [BrandsController::class, 'update']);
    Route::put('/catalogue/update/{id}', [CataloguesController::class, 'update']);
    Route::put('/supplier/update/{id}', [SuppliersController::class, 'update']);
    Route::put('/model/update/{id}', [ModelsController::class, 'update']);
    Route::put('/inventory/update/{id}', [InventoriesController::class, 'update']);
    Route::put('/customer/update', [CustomersController::class, 'update']);
    Route::put('/user/update/{id}', [UsersController::class, 'update']);

});
Route::get('/is_auth',[UsersController::class,'is_Auth']);


Route::put('/update-status/brands/{id}', [BrandsController::class, 'updateBrandStatus']);
Route::put('/update-status/catalogues/{id}', [CataloguesController::class, 'updateCatalogueStatus']);
Route::put('/update-status/suppliers/{id}', [SuppliersController::class, 'updateSupplierStatus']);
Route::put('/update-status/users/{id}', [UsersController::class, 'updateUserStatus']);
Route::put('/update-status/models/{id}', [ModelsController::class, 'updateModelStatus']);
