import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Detalle} from "../../Core/Interfaces/detalle";
import {OrderDetailsService} from "../../Core/Services/Order-Details/order-details.service";
import {Router} from "@angular/router";
import {UsersService} from "../../Core/Services/User/users.service";
import {FormsModule} from "@angular/forms";
import {DetalleStore} from "../../Core/Interfaces/detalle-store";



@Component({
  selector: 'app-tab-orden-detalle',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './tab-orden-detalle.component.html',
  styleUrl: './tab-orden-detalle.component.css'
})
export class TabOrdenDetalleComponent {

  data:Detalle[] = [];
  is_admin:boolean = false;
  fecha: string = '';
  detalle:DetalleStore=
    {
      status:'pendiente',
      delery_date:''
    }
    erorDate:String|null=null;

  constructor(private orderDetails:OrderDetailsService,
              private router:Router,
              private userServices:UsersService)
  {
    this.getDetails();
    this.isAdmin();
  }


  getDetails(id:number|null=null):void {
    this.orderDetails.getDetails(id).subscribe((data) => {
      this.data = data.data;
    },
      (error) =>
      {
        if (error.status === 401)
        {
          this.router.navigate(['/']);
        }
      }
    );
  }

  public isAdmin():void
  {
    this.userServices.isAdmin().subscribe((data) => {
      this.is_admin = data.is_admin;
    },
      (error) =>{
        if (error.status === 401)
        {
          this.router.navigate(['/']);
        }
      });
  }



  changeStatus(status: string,id:number) {
    this.detalle.delery_date=this.fecha
     this.detalle.status = status;
    this.orderDetails.changeStatus(this.detalle,id).subscribe((data) => {
      this.getDetails();
    },
      (error) =>{
        if (error.status === 401)
        {
          this.router.navigate(['/']);
        }
        if(error.error?.Errores?.delery_date!==undefined && error.error.Errores.delery_date!==null)
        {
          this.erorDate=error.error.Errores.delery_date;
        }
        else {this.erorDate=null;}
      });

  }
}
