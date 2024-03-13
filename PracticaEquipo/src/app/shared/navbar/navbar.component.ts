import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {UsersService} from "../../Core/Services/User/users.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  is_admin: boolean = false;
  is_user: boolean = false;
  is_guest: boolean = false;
  constructor(private userService: UsersService)
  {
    this.is_Admin();
    this.is_User();
    this.is_Guest();
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

  is_User()
  {
    this.userService.isUser().subscribe(
      (res) => {
        this.is_user = res.is_user;
      },
      (error) => {
        if (error.status === 401) {
          console.log('No autorizado');
        }
      }
    );
  }

  is_Guest()
  {
    this.userService.isGuest().subscribe(
      (res) => {
        this.is_guest = res.is_guest;
      },
      (error) => {
        if (error.status === 401) {
          console.log('No autorizado');
        }
      }
    );
  }



}
