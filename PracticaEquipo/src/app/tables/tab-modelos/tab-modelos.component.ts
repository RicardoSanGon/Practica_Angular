import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

import {MapModels} from "../../Core/Interfaces/map-models";
import {ModelsService} from "../../Core/Services/Model/models.service";
import {UsersService} from "../../Core/Services/User/users.service";
import {OrdersService} from "../../Core/Services/Order/orders.service";
import {CarritoService} from "../../Core/Services/Carrito/carrito.service";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-tab-modelos',
  standalone: true,
  imports: [ NgForOf, NgIf, RouterModule],
  templateUrl: './tab-modelos.component.html',
  styleUrl: './tab-modelos.component.css'
})
export class TabModelosComponent {
  public model_data:MapModels[]=[];
  public is_admin:boolean=false;
  public is_client:boolean=false;
  public msg:String|null=null;
  constructor(private modelsService: ModelsService,
              private userService: UsersService,
              private ordersService: OrdersService,
              private carritoService: CarritoService) {
    this.getModels();
    this.is_Client();
  }
  agregarAlCarrito(model: MapModels) {
    this.carritoService.agregarAlCarrito(model);
  }

  private getModels() {
   this.modelsService.getModels().subscribe(
        (res) => {
          console.log(res);
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
            console.log('No autorizado');
          }
        }
      );
  }
  private is_Client()
  {
    return this.userService.isClient().subscribe(
      (res) => {
        console.log(res);
        this.is_client=res.is_client;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createOrder() {
    this.ordersService.createOrder().subscribe(
      (res) => {
        console.log(res);
        this.msg=res.msg;
      },
      (error) => {
        this.msg=error.error.msg;
      }
    );
  }
}
