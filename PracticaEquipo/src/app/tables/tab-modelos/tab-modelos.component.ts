import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

import {MapModels} from "../../Core/Interfaces/map-models";
import {ModelsService} from "../../Core/Services/Model/models.service";
import {UsersService} from "../../Core/Services/User/users.service";
import {OrdersService} from "../../Core/Services/Order/orders.service";
import {CarritoService} from "../../Core/Services/Carrito/carrito.service";
import {Router, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Models} from "../../Core/Interfaces/models";
import {BrandsService} from "../../Core/Services/Brand/brands.service";
import {Brands} from "../../Core/Interfaces/brands";


@Component({
  selector: 'app-tab-modelos',
  standalone: true,
  imports: [NgForOf, NgIf, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tab-modelos.component.html',
  styleUrl: './tab-modelos.component.css'
})
export class TabModelosComponent {
  public model_data:MapModels[]=[];
  public is_admin:boolean=false;
  public is_client:boolean=false;
  public msg:String|null=null;
  public brandList: Brands[]=[];
  modifyModel: Models=
    {
      id:0,
      model_name:'',
      model_year:0,
      model_description:'',
      model_price:0,
      model_stock:0,
      brand_id:0,
      model_status:'',
    };
  constructor(private modelsService: ModelsService,
              private userService: UsersService,
              private ordersService: OrdersService,
              private carritoService: CarritoService,
              private brandsService: BrandsService,
              private router: Router) {
    this.getModels();
    this.is_Client();
    this.getBrands();
  }
  agregarAlCarrito(model: MapModels) {
    this.carritoService.agregarAlCarrito(model);
  }

  getModels() {
   this.modelsService.getModels().subscribe(
        (res) => {
          for(let model of res.data)
          {
            if(res.is_admin)
            {
              this.model_data.push(model);
            }
            else
            {
                this.model_data.push(model);
            }
          }
          this.is_admin=res.is_admin;
        },
        (error) => {
          if(error.status===401)
          {
            this.router.navigate(['nabvar/tab-Catalogo'])
          }
        }
      );
  }

  private getBrands()
  {
    this.brandsService.tabgetBrands().subscribe(
      (res) => {
        this.brandList=res.data;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['nabvar/tab-Catalogo'])
        }
      }
    );
  }
  private is_Client()
  {
    return this.userService.isClient().subscribe(
      (res) => {
        this.is_client=res.is_client;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['nabvar/tab-Catalogo'])
        }
      }
    );
  }

  createOrder() {
    this.ordersService.createOrder().subscribe(
      (res) => {
        this.msg=res.msg;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['nabvar/tab-Catalogo'])
        }
        this.msg=error.error.msg;
      }
    );
  }

  updateModel() {

  }

  selectedModel(model: MapModels) {
    this.modifyModel.model_name=model.modelo;
    this.modifyModel.model_price=model.precio;
    this.modifyModel.model_description=model.descripcion;
    this.modifyModel.model_year=Number(model.year);
    this.modifyModel.model_stock=model.existencias;
    this.modifyModel.id=model.id;
    this.modifyModel.model_status=model.status;
    for (let brand of this.brandList) {
      if (brand.brand_name === model.marca) {
        this.modifyModel.brand_id = brand.id;
      }
    }
    console.log(this.modifyModel);
  }

  selectedModelStatus($event: any) {
    this.modifyModel.model_status=$event.target.value;
    console.log(this.modifyModel.model_status);
  }
}
