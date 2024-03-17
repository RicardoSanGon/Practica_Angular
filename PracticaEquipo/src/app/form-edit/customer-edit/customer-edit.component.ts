import { Component } from '@angular/core';
import {UCustomer} from "../../Core/Interfaces/ucustomer";
import {Router} from "@angular/router";
import {UsersService} from "../../Core/Services/User/users.service";
import {FormsModule} from "@angular/forms";
import {CustomersService} from "../../Core/Services/Customer/customers.service";


@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent {

  customer: UCustomer={
    id: 0,
    customer_address: '',
    customer_phone: '',
    user_id: 0
  }

  constructor(private userService: UsersService,
              private customerService: CustomersService,
              private router: Router) {
              this.getCustomer();
  }

getCustomer() {
  this.userService.getOneCustomer().subscribe(
    res => {
      console.log(res)
      this.customer = res;
    },
    err => {
      console.log(err);
    }
  );
}

  updateCustomer() {
    this.customer.customer_phone=this.customer.customer_phone.toString();
    this.customerService.updateCustomer(this.customer).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['navbar/tab-Catalogo']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
