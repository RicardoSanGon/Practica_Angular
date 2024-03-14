<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Catalogue;
use App\Models\Rol;
use App\Models\Brand;
use App\Models\Model;
use App\Models\Supplier;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Data extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('catalogues')->insert([
            ['name'=>'Sedan'],
            ['name'=>'Hatchback'],
            ['name'=>'SUV'],
            ['name'=>'Pickup'],
            ['name'=>'Van'],
            ['name'=>'Coupe'],
            ['name'=>'Convertible'],
            ['name'=>'Truck'],
            ['name'=>'Minivan'],
            ['name'=>'Sports Car'],
            ['name'=>'Luxury Car'],
            ['name'=>'Electric Car'],
            ['name'=>'Commercial'],
        ]);
        DB::table('rols')->insert([
            ['rol'=>'admin'],
            ['rol'=>'user'],
            ['rol'=>'guest'],
        ]);

        DB::table('brands')->insert([
            ['brand_name'=>'Audi', 'catalogue_id'=>1],
            ['brand_name'=>'BMW', 'catalogue_id'=>2],
            ['brand_name'=>'Mercedes', 'catalogue_id'=>3],
            ['brand_name'=>'Toyota', 'catalogue_id'=>4],
            ['brand_name'=>'Ford', 'catalogue_id'=>5],
            ['brand_name'=>'Porsche', 'catalogue_id'=>6],
            ['brand_name'=>'Ferrari', 'catalogue_id'=>7],
            ['brand_name'=>'Volvo', 'catalogue_id'=>8],
            ['brand_name'=>'Honda', 'catalogue_id'=>9],
            ['brand_name'=>'Lamborghini', 'catalogue_id'=>10],
            ['brand_name'=>'Rolls-Royce', 'catalogue_id'=>11],
            ['brand_name'=>'Tesla', 'catalogue_id'=>12],
            ['brand_name'=>'Volkswagen', 'catalogue_id'=>13],
        ]);

        $audiId = DB::table('brands')->where('brand_name', 'Audi')->first()->id;
        $bmwId = DB::table('brands')->where('brand_name', 'BMW')->first()->id;
        $mercedesId = DB::table('brands')->where('brand_name', 'Mercedes')->first()->id;
        $toyotaId = DB::table('brands')->where('brand_name', 'Toyota')->first()->id;
        $fordId = DB::table('brands')->where('brand_name', 'Ford')->first()->id;
        $porscheId = DB::table('brands')->where('brand_name', 'Porsche')->first()->id;
        $ferrariId = DB::table('brands')->where('brand_name', 'Ferrari')->first()->id;
        $volvoId = DB::table('brands')->where('brand_name', 'Volvo')->first()->id;
        $hondaId = DB::table('brands')->where('brand_name', 'Honda')->first()->id;
        $lamborghiniId = DB::table('brands')->where('brand_name', 'Lamborghini')->first()->id;
        $rollsRoyceId = DB::table('brands')->where('brand_name', 'Rolls-Royce')->first()->id;
        $teslaId = DB::table('brands')->where('brand_name', 'Tesla')->first()->id;
        $volkswagenId = DB::table('brands')->where('brand_name', 'Volkswagen')->first()->id;


        DB::table('vehicle_models')->insert([
            ['model_name'=>'Audi A4', 'brand_id'=>$audiId, 'model_year'=>2023, 'model_description'=>'Audi A4 description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'BMW X3', 'brand_id'=>$bmwId, 'model_year'=>2023, 'model_description'=>'BMW X3 description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'BMW X5', 'brand_id'=>$bmwId, 'model_year'=>2023, 'model_description'=>'BMW X5 description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Mercedes C', 'brand_id'=>$mercedesId, 'model_year'=>2023, 'model_description'=>'Mercedes C description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Mercedes E', 'brand_id'=>$mercedesId, 'model_year'=>2023, 'model_description'=>'Mercedes E description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Toyota Corolla', 'brand_id'=>$toyotaId, 'model_year'=>2023, 'model_description'=>'Toyota Corolla description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Toyota Camry', 'brand_id'=>$toyotaId, 'model_year'=>2023, 'model_description'=>'Toyota Camry description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Ford F150', 'brand_id'=>$fordId, 'model_year'=>2023, 'model_description'=>'Ford F150 description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Ford Mustang', 'brand_id'=>$fordId, 'model_year'=>2023, 'model_description'=>'Ford Mustang description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Porsche 911', 'brand_id'=>$porscheId, 'model_year'=>2023, 'model_description'=>'Porsche 911 description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Porsche Cayenne', 'brand_id'=>$porscheId, 'model_year'=>2023, 'model_description'=>'Porsche Cayenne description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Ferrari 488', 'brand_id'=>$ferrariId, 'model_year'=>2023, 'model_description'=>'Ferrari 488 description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Ferrari 812', 'brand_id'=>$ferrariId, 'model_year'=>2023, 'model_description'=>'Ferrari 812 description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Volvo XC90', 'brand_id'=>$volvoId, 'model_year'=>2023, 'model_description'=>'Volvo XC90 description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Volvo S60', 'brand_id'=>$volvoId, 'model_year'=>2023, 'model_description'=>'Volvo S60 description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Honda Civic', 'brand_id'=>$hondaId, 'model_year'=>2023, 'model_description'=>'Honda Civic description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Honda Accord', 'brand_id'=>$hondaId, 'model_year'=>2023, 'model_description'=>'Honda Accord description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Lamborghini Huracan', 'brand_id'=>$lamborghiniId, 'model_year'=>2023, 'model_description'=>'Lamborghini Huracan description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Lamborghini Aventador', 'brand_id'=>$lamborghiniId, 'model_year'=>2023, 'model_description'=>'Lamborghini Aventador description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Rolls-Royce Phantom', 'brand_id'=>$rollsRoyceId, 'model_year'=>2023, 'model_description'=>'Rolls-Royce Phantom description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Rolls-Royce Ghost', 'brand_id'=>$rollsRoyceId, 'model_year'=>2023, 'model_description'=>'Rolls-Royce Ghost description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Tesla Model S', 'brand_id'=>$teslaId, 'model_year'=>2023, 'model_description'=>'Tesla Model S description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Tesla Model 3', 'brand_id'=>$teslaId, 'model_year'=>2023, 'model_description'=>'Tesla Model 3 description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Volkswagen Golf', 'brand_id'=>$volkswagenId, 'model_year'=>2023, 'model_description'=>'Volkswagen Golf description', 'model_price'=>30000,'model_stock'=>10],
            ['model_name'=>'Volkswagen Passat', 'brand_id'=>$volkswagenId, 'model_year'=>2023, 'model_description'=>'Volkswagen Passat description', 'model_price'=>30000,'model_stock'=>10]
        ]);

        DB::table('suppliers')->insert([
            ['supplier_name'=>'Supplier 1', 'supplier_email'=>'info@supplier1.com', 'supplier_phone'=>'1234567890'],
            ['supplier_name'=>'Supplier 2', 'supplier_email'=>'info@supplier2.com', 'supplier_phone'=>'0987654321'],
            ['supplier_name'=>'Supplier 3', 'supplier_email'=>'info@supplier3.com', 'supplier_phone'=>'1122334455'],
            ]);

        DB::table('users')->insert([

            ['name'=>'admin', 'email'=>'rs795384@hotmail.com', 'password'=>Hash::make('admin'), 'role_id'=>1,'status'=>true],
            ]);
    }
}
