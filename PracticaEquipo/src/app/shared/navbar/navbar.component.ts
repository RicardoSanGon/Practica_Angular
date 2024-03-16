import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../Core/Services/User/users.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  is_admin: boolean = false;
  is_user: boolean = false;
  is_guest: boolean = false;
  is_client: boolean = false;
  constructor(private userService: UsersService, private router: Router) {}
  ngOnInit(): void {
    this.is_Admin();
    this.is_User();
    this.is_Guest();
    this.is_Client();
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

  is_User() {
    this.userService.isUser().subscribe(
      (res) => {
        this.is_user = res.is_user;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  is_Guest() {
    this.userService.isGuest().subscribe(
      (res) => {
        this.is_guest = res.is_guest;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  is_Client() {
    this.userService.isClient().subscribe(
      (res) => {
        this.is_client = res.is_client;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  CerrarSesion() {
    this.userService.LogOut().subscribe(
      (res) => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
