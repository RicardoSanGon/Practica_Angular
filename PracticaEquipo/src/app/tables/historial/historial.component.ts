import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {DataHistorial} from "../../Core/Interfaces/data-historial";
import {Historial} from "../../Core/Interfaces/historial";
import {HistorialesService} from "../../Core/Services/Historial/historiales.service";
import {UsersService} from "../../Core/Services/User/users.service";

@Component({
  selector: 'app-historial',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink
    ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {

  public data:Historial[] = [];
  public is_admin:boolean = false;

  constructor(private historialesService:HistorialesService,
              private userServices:UsersService,
              private router:Router) {
    this.getHistoriales();
    }


    getHistoriales(){
      this.historialesService.getHistoriales().subscribe((res) => {
        this.data = res.data;
      },
        (error) =>
        {
          if(error.status === 401){
            this.router.navigate(['/'])
          }
        }
      );
    }

    isAdmin(){
      this.userServices.isAdmin().subscribe((res) => {
        this.is_admin = res.is_admin;
      },
        (error) =>
        {
          if(error.status === 401){
            this.router.navigate(['/'])
          }
        }
      );
    }

}
