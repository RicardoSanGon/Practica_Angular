import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NgForOf, NgIf } from '@angular/common';
import { Supplier } from '../../Core/Interfaces/supplier';
import { SuppliersService } from '../../Core/Services/Supplier/suppliers.service';
import {Router, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-tab-proveedores',
  standalone: true,
  imports: [NavbarComponent, NgForOf, RouterModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './tab-proveedores.component.html',
  styleUrl: './tab-proveedores.component.css',
})
export class TabProveedoresComponent {
  suppliersList: Supplier[] = [];
  modifySupplier: Supplier = {
    id: 0,
    supplier_name: '',
    supplier_phone: '',
    supplier_email: '',
    supplier_status: true,
  };

  constructor(private suppliersService: SuppliersService,
              private router:Router) {
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

  updateSupplier() {
    this.suppliersService.updateSupplier(this.modifySupplier).subscribe({
      next: () => {
       this.getSupplier();
      },
      error: (error) => {
        console.log(error);
        if (error.status===401){
          this.router.navigate(['navbar/tab-Catalogo'])
        }
      }
    });

  }

  selectedSupplier(item: Supplier) {
    this.modifySupplier = item;
  }

  SelectedModify($event: any) {
    this.modifySupplier.supplier_status = $event.target.value;
  }
}
