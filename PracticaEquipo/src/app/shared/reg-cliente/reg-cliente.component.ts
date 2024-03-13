import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import {Customerstore} from "../../Core/Interfaces/customerstore";
import {CustomersService} from "../../Core/Services/Customer/customers.service";
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-reg-cliente',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './reg-cliente.component.html',
  styleUrl: './reg-cliente.component.css'
})
export class RegClienteComponent {
  public customer:Customerstore=
    {
      customer_address: '',
      customer_phone: '',
    }
    public errorAddress:String|null=null;
    public errorPhone:String|null=null;
    public errorUser:String|null=null;

    constructor(private customerService:CustomersService,
                private router:Router) { }

    public createCustomer(){
      this.customerService.createCustomer(this.customer).subscribe(
        (response) => {
          this.router.navigate(['tab-Modelos'])
        },
        (error) => {
          if(error.status===401)
          {
            this.router.navigate(['/']);
          }
          if(error.error?.Errores?.customer_address!==undefined && error.error.Errores.customer_address!==null)
          {
            this.errorAddress=error.error.Errores.customer_address;
          }
          else
          {
            this.errorAddress=null;
          }
          if(error.error?.Errores?.customer_phone!==undefined && error.error.Errores.customer_phone!==null)
          {
            this.errorPhone=error.error.Errores.customer_phone;
          }
          else
          {
            this.errorPhone=null;
          }
          if(error.error?.msg!==undefined && error.error.msg!==null)
          {
            this.errorUser=error.error.msg;
          }
          else
          {
            this.errorUser=null;
          }
        }
      );
    }

}
