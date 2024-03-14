import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NgForOf } from '@angular/common';
import { CustomersService } from '../../Core/Services/Customer/customers.service';
import { Customer } from '../../Core/Interfaces/customer';

@Component({
  selector: 'app-tab-clientes',
  standalone: true,
  imports: [NavbarComponent, NgForOf],
  templateUrl: './tab-clientes.component.html',
  styleUrl: './tab-clientes.component.css',
})
export class TabClientesComponent {
  customersList: Customer[] = [];

  constructor(private customersService: CustomersService) {
    this.getCustomer();
  }
  getCustomer() {
    this.customersService.getCustomer().subscribe({
      next: (result) => {
        console.log(result);
        this.customersList = result.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
