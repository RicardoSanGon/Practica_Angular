import {Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import {NgForOf, NgIf} from '@angular/common';
import { BrandByCatalogue } from '../../Core/Interfaces/brand-by-catalogue';
import { BrandsService } from '../../Core/Services/Brand/brands.service';
import { Brands } from '../../Core/Interfaces/brands';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {UsersService} from "../../Core/Services/User/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab-marcas',
  standalone: true,
  imports: [NavbarComponent, NgForOf, NgIf],
  templateUrl: './tab-marcas.component.html',
  styleUrl: './tab-marcas.component.css',
})
export class TabMarcasComponent{
  brandsList: Brands[] = [];
  is_admin: boolean = false;

  constructor(private brandsService: BrandsService,
              private userService:UsersService,
              private router:Router) {
    this.getBrands();
    this.is_Admin();
  }


  getBrands() {
    this.brandsService.tabgetBrands().subscribe({
      next: (result) => {
        console.log(result);
        this.brandsList = result.data;

      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  is_Admin()
  {
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
