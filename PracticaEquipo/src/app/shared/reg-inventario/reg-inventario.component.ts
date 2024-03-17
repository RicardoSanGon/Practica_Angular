import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Inventory } from '../../Core/Interfaces/inventory';
import { FormsModule } from '@angular/forms';
import { InventoriesService } from '../../Core/Services/Inventory/inventories.service';
import { SuppliersService } from '../../Core/Services/Supplier/suppliers.service';
import { Supplier } from '../../Core/Interfaces/supplier';
import { NgForOf, NgIf } from '@angular/common';
import { ModelsService } from '../../Core/Services/Model/models.service';
import { MapModels } from '../../Core/Interfaces/map-models';

@Component({
  selector: 'app-reg-inventario',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FormsModule, NgForOf, NgIf],
  templateUrl: './reg-inventario.component.html',
  styleUrl: './reg-inventario.component.css',
})
export class RegInventarioComponent {
  public inventory: Inventory = {
    admission_date: '',
    stock: 0,
    model_id: 0,
    supplier_id: 0,
  };
  public supplier_data: Supplier[] = [];
  public models_data: MapModels[] = [];
  public errorDate: String | null = null;
  public errorStock: String | null = null;
  public errorModel: String | null = null;
  public errorSupplier: String | null = null;
  constructor(
    private inventoriesService: InventoriesService,
    private suppliersService: SuppliersService,
    private modelsService: ModelsService,
    private router: Router
  ) {
    this.getSuppliers();
    this.getModels();
  }

  private getSuppliers() {
    this.suppliersService.getSuppliers().subscribe(
      (data) => {
        this.supplier_data = data.data;
        if (this.supplier_data.length > 0) {
          this.inventory.supplier_id = <number>this.supplier_data[0].id;
        }
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  public getModels(): void {
    this.modelsService.getModels().subscribe(
      (data) => {
        for (let model of data.data) {
          if (model.status === 'Activo') {
            this.models_data.push(model);
          }
        }
        this.inventory.model_id = this.models_data[0].id;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  submitForm() {
    this.errorDate = null;
    this.errorStock = null;
    this.errorModel = null;
    this.errorSupplier = null;

    if (!this.inventory.admission_date) {
      this.errorDate = 'La fecha de admisión es requerida.';
      return;
    }

    if (this.inventory.stock < 10) {
      this.errorStock = 'El stock minimo es de 10.';
      return;
    }

    if (!this.inventory.model_id) {
      this.errorModel = 'Debes seleccionar un modelo.';
      return;
    }

    if (!this.inventory.supplier_id) {
      this.errorSupplier = 'Debes seleccionar un proveedor.';
      return;
    }

    // Lógica para enviar el formulario si pasa las validaciones
    this.inventoriesService.addInventory(this.inventory).subscribe(
      (data) => {
        console.log(data);
        alert('¡El invenatio se añadió correctamente!');
        this.router.navigate(['navbar/tab-Inventario']);
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
        if (
          error.error?.Errores?.admission_date !== undefined &&
          error.error.Errores.admission_date !== null
        ) {
          this.errorDate = error.error.Errores.admission_date;
        } else {
          this.errorDate = null;
        }
        if (
          error.error?.Errores?.stock !== undefined &&
          error.error.Errores.stock !== null
        ) {
          this.errorStock = error.error.Errores.stock;
        } else {
          this.errorStock = null;
        }
        if (
          error.error?.Errores?.model_id !== undefined &&
          error.error.Errores.model_id !== null
        ) {
          this.errorModel = error.error.Errores.model_id;
        } else {
          this.errorModel = null;
        }
        if (
          error.error?.Errores?.supplier_id !== undefined &&
          error.error.Errores.supplier_id !== null
        ) {
          this.errorSupplier = error.error.Errores.supplier_id;
        } else {
          this.errorSupplier = null;
        }
      }
    );
  }

  onSupplierSelected($event: any) {
    this.inventory.supplier_id = $event.target.value;
    console.log(this.inventory.supplier_id)
  }

  onModelSelected($event: any) {
    this.inventory.model_id = $event.target.value;
  }
}
