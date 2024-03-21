import {Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NgForOf } from '@angular/common';
import { CustomersService } from '../../Core/Services/Customer/customers.service';
import { Customer } from '../../Core/Interfaces/customer';
import {SseService} from "../../Core/Services/See/see.service";

@Component({
  selector: 'app-tab-clientes',
  standalone: true,
  imports: [NavbarComponent, NgForOf],
  templateUrl: './tab-clientes.component.html',
  styleUrl: './tab-clientes.component.css',
})
export class TabClientesComponent implements OnInit {
  customersList: Customer[] = [];

  constructor(private customersService: CustomersService,
              private sseService: SseService,
              private changeDetector: ChangeDetectorRef) {
    this.getCustomer();

  }
  getCustomer() {
    this.customersService.getCustomer().subscribe({
      next: (result) => {
        this.customersList = result.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {

  }
}

/*
 this.sseService.getServerSentEvent('http://127.0.0.1:8000/api/see').subscribe(
      event => {
        this.customersList = JSON.parse(event.data);
        this.changeDetector.detectChanges();
      },
      error => console.error(error)
    );
 */
