import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NgForOf, NgIf } from '@angular/common';
import { BrandByCatalogue } from '../../Core/Interfaces/brand-by-catalogue';
import { BrandsService } from '../../Core/Services/Brand/brands.service';
import { Brands } from '../../Core/Interfaces/brands';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { UsersService } from '../../Core/Services/User/users.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab-marcas',
  standalone: true,
  imports: [NavbarComponent, NgForOf, NgIf, RouterModule],
  templateUrl: './tab-marcas.component.html',
  styleUrl: './tab-marcas.component.css',
})
export class TabMarcasComponent {
  brandsList: Brands[] = [];
  is_admin: boolean = false;

  constructor(
    private brandsService: BrandsService,
    private userService: UsersService,
    private router: Router
  ) {
    this.getBrands();
    this.is_Admin();
  }

  getBrands() {
    this.brandsService.tabgetBrands().subscribe({
      next: (result) => {
        console.log(result);
        if (this.is_admin) {
          this.brandsList = result.data;
        } else {
          this.brandsList = result.data.filter(
            (brand) => brand.brand_status === 'Activo'
          );
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      },
    });
  }

  is_Admin() {
    this.userService.isAdmin().subscribe(
      (res) => {
        console.log(this.is_admin);
        this.is_admin = res.is_admin;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    );
  }
}
