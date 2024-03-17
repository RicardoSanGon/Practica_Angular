import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {UsersService} from "../../Core/Services/User/users.service";
import {FacturacionesService} from "../../Core/Services/Factura/facturaciones.service";
import {Facturacion} from "../../Core/Interfaces/facturacion";

@Component({
  selector: 'app-tab-faturacion',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './tab-faturacion.component.html',
  styleUrl: './tab-faturacion.component.css'
})
export class TabFaturacionComponent {
public facturacionesList: Facturacion[] = [];
errorBills:String|null=null;
  constructor(private facturacionesService:FacturacionesService,
              private router:Router) {
    this.getFacturaciones();
  }

  private getFacturaciones() {
    this.facturacionesService.getFacturaciones().subscribe(
      (result) => {
        this.facturacionesList=result.data;
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
        if(error.error?.msg!==undefined && error.error?.msg!==null)
        {
          this.errorBills=error.error.msg;
        }
        else {
          this.errorBills = 'Error al cargar las facturaciones';
        }
      }
    );
  }
}
