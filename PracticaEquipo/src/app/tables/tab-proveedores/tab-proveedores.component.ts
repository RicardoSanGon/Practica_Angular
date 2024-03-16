import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NgForOf } from '@angular/common';
import { Supplier } from '../../Core/Interfaces/supplier';
import { SuppliersService } from '../../Core/Services/Supplier/suppliers.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab-proveedores',
  standalone: true,
  imports: [NavbarComponent, NgForOf, RouterModule],
  templateUrl: './tab-proveedores.component.html',
  styleUrl: './tab-proveedores.component.css',
})
export class TabProveedoresComponent {
  suppliersList: Supplier[] = [];
  
  constructor(private suppliersService: SuppliersService) {
    this.getSupplier();
  }
  getSupplier() {
    this.suppliersService.getSuppliers().subscribe({
      next: (result) => {
        this.suppliersList = result.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
