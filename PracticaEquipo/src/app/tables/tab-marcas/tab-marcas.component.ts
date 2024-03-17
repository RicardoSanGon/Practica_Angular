import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NgForOf, NgIf } from '@angular/common';
import { BrandByCatalogue } from '../../Core/Interfaces/brand-by-catalogue';
import { BrandsService } from '../../Core/Services/Brand/brands.service';
import { Brands } from '../../Core/Interfaces/brands';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { UsersService } from '../../Core/Services/User/users.service';
import { Router, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Catalogue} from "../../Core/Interfaces/catalogue";
import {CataloguesService} from "../../Core/Services/Catalogue/catalogues.service";

@Component({
  selector: 'app-tab-marcas',
  standalone: true,
    imports: [NavbarComponent, NgForOf, NgIf, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tab-marcas.component.html',
  styleUrl: './tab-marcas.component.css',
})
export class TabMarcasComponent {
  brandsList: Brands[] = [];
  is_admin: boolean = false;

  modifyBrand: Brands =
    {
      id: 0,
      brand_name: '',
      brand_status: '',
      catalogue_id:0,
    };

  cataloguesList: Catalogue[] = [];

  constructor(
    private brandsService: BrandsService,
    private userService: UsersService,
    private router: Router,
    private CatalogueService: CataloguesService
  ) {
    this.is_Admin();
    this.getBrands();
    this.getCatalogues();
  }

  async getBrands() {
    this.brandsService.tabgetBrands().subscribe({
      next: (result) => {
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

  getCatalogues()
  {
    this.CatalogueService.getCatalogues().subscribe({
      next: (result) => {
        this.cataloguesList = result.data;
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['navbar/tab-Catalogo']);
        }
      },
    });
  }

  is_Admin() {
    this.userService.isAdmin().subscribe(
      (res) => {
        this.is_admin = res.is_admin;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  selectedBrand(item: Brands) {
    this.modifyBrand = item;
  }

  catalogueBrand($event: any) {
    this.modifyBrand.catalogue_id = $event.target.value;
  }

  updateBrand() {
    for (let i = 0; i < this.cataloguesList.length; i++) {
      if (this.cataloguesList[i].name == this.modifyBrand.catalogue_id.toString()) {
        this.modifyBrand.catalogue_id =  this.cataloguesList[i].id;
      }
    }
    this.brandsService.updateBrand(this.modifyBrand).subscribe(()=>
    {
      this.getBrands();
    },
      (error) => {
      console.log(error);
        if (error.status === 401) {
          this.router.navigate(['navbar/tab-Catalogo']);
        }
        this.getBrands()
      });
  }

  isModifyBrand($event: any) {
    this.modifyBrand.brand_status = $event.target.value;
    console.log(this.modifyBrand.brand_status);
  }
}
