import { Component } from '@angular/core';
import { CataloguesService } from '../../Core/Services/Catalogue/catalogues.service';
import { Catalogue } from '../../Core/Interfaces/catalogue';
import {NgForOf, NgIf} from '@angular/common';
import { RouterModule } from '@angular/router';
import {UsersService} from "../../Core/Services/User/users.service";
import {NavbarComponent} from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-tab-catalogo',
  standalone: true,
  imports: [NgForOf, RouterModule, NgIf, NavbarComponent],
  templateUrl: './tab-catalogo.component.html',
  styleUrl: './tab-catalogo.component.css',
})
export class TabCatalogoComponent {
  catalogoList: Catalogue[] = [];
  is_admin: boolean = false;

  constructor(private cataloguesService: CataloguesService,
              private userService: UsersService) {
    this.getCatalogo();
    this.is_Admin()
  }

  getCatalogo() {
    this.cataloguesService.getCatalogues().subscribe({
      next: (result) => {
        this.catalogoList = result.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  is_Admin()
  {
    this.userService.isAdmin().subscribe(
      (res) => {
        this.is_admin = res.is_admin;
      },
      (error) => {
        if (error.status === 401) {
          console.log('No autorizado');
        }
      }
    );
  }
}
