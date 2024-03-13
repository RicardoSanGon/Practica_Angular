import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {Supplier} from "../../Core/Interfaces/supplier";
import {SuppliersService} from "../../Core/Services/Supplier/suppliers.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-reg-proveedor',
  standalone: true,
  imports: [NavbarComponent, NgIf, FormsModule],
  templateUrl: './reg-proveedor.component.html',
  styleUrl: './reg-proveedor.component.css'
})
export class RegProveedorComponent {
public supplier:Supplier =
  {
    id: null,
    supplier_name: '',
    supplier_email: '',
    supplier_phone: '',
    supplier_status: true
  };
public errorName:String|null = null;
public errorEmail:String|null = null;
public errorPhone:String|null = null;
  constructor(private supplerService:SuppliersService) { }

  public createSupplier()
  {
    this.supplerService.createSupplier(this.supplier).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        if(err.status===401)
        {
          console.log('Unauthenticated');
        }
        if(err.error?.Errores?.supplier_name!==undefined && err.error.Errores.supplier_name!==null)
        {
          this.errorName = err.error.Errores.supplier_name;
        }
        else {
          this.errorName = null;
        }
        if(err.error?.Errores?.supplier_email!==undefined && err.error.Errores.supplier_email!==null)
        {
          this.errorEmail = err.error.Errores.supplier_email;
        }
        else {this.errorEmail=null;}
        if(err.error?.Errores?.supplier_phone!==undefined && err.error.Errores.supplier_phone!==null)
        {
          this.errorPhone = err.error.Errores.supplier_phone;
        }
        else{this.errorPhone=null;}
      }
    );
  }
}
