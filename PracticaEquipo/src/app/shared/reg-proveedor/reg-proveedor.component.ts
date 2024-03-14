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
  public supplier: Supplier = {
    id: null,
    supplier_name: '',
    supplier_email: '',
    supplier_phone: '',
    supplier_status: true
  };
  public errorName: string | null = null;
  public errorEmail: string | null = null;
  public errorPhone: string | null = null;

  constructor(private supplierService: SuppliersService) { }

  public createSupplier() {
    if (!this.validateForm()) {
      return;
    }

    this.supplierService.createSupplier(this.supplier).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        if (err.status === 401) {
          console.log('Unauthenticated');
        }
        if (err.error?.Errores?.supplier_name !== undefined && err.error.Errores.supplier_name !== null) {
          this.errorName = err.error.Errores.supplier_name;
        } else {
          this.errorName = null;
        }
        if (err.error?.Errores?.supplier_email !== undefined && err.error.Errores.supplier_email !== null) {
          this.errorEmail = err.error.Errores.supplier_email;
        } else {
          this.errorEmail = null;
        }
        if (err.error?.Errores?.supplier_phone !== undefined && err.error.Errores.supplier_phone !== null) {
          this.errorPhone = err.error.Errores.supplier_phone;
        } else {
          this.errorPhone = null;
        }
      }
    );
  }

  private validateForm(): boolean {
    let isValid = true;
    if (!this.supplier.supplier_name || this.supplier.supplier_name.length < 3 || this.supplier.supplier_name.length > 50) {
      this.errorName = 'El nombre del proveedor debe tener entre 3 y 50 caracteres';
      isValid = false;
    } else {
      this.errorName = null;
    }
    if (!this.supplier.supplier_email) {
      this.errorEmail = 'El correo del proveedor es obligatorio';
      isValid = false;
    } else {
      this.errorEmail = null;
    }
    if (!this.supplier.supplier_phone || !this.isValidPhoneNumber(this.supplier.supplier_phone)) {
      this.errorPhone = 'El teléfono del proveedor debe contener exactamente 10 dígitos';
      isValid = false;
    } else {
      this.errorPhone = null;
    }
    return isValid;
  }

  private isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  }
}