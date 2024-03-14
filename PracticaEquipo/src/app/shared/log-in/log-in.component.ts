import { Component } from '@angular/core';
<<<<<<< HEAD
import {UserLogIn} from "../../Core/Interfaces/user-log-in";
import {FormsModule, NgModel} from "@angular/forms";
import {UsersService} from "../../Core/Services/User/users.service";
import {NgIf} from "@angular/common";
import { Router ,RouterModule } from '@angular/router';

=======
import { UserLogIn } from '../../Core/Interfaces/user-log-in';
import { FormsModule, NgModel } from '@angular/forms';
import { UsersService } from '../../Core/Services/User/users.service';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
>>>>>>> 3ba9dd1f508ba4bc56f9d25e52a6aee5b671a7db

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  public errorEmail: string | null = null;
  public errorPassword: string | null = null;

  public msgError: string | null = null;
<<<<<<< HEAD
  public constructor(private userService: UsersService,
                     private router:Router) {

  }
=======
  public constructor(
    private userService: UsersService,
    private router: Router
  ) {}
>>>>>>> 3ba9dd1f508ba4bc56f9d25e52a6aee5b671a7db
  public user: UserLogIn = {
    email: '',
    password: '',
  };

  public submitForm() {
    this.userService.LogInUser(this.user).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
<<<<<<< HEAD

        console.log('logueado');

        this.router.navigate(['code/verification']);

=======

        this.router.navigate(['code/verification']);
>>>>>>> 3ba9dd1f508ba4bc56f9d25e52a6aee5b671a7db
      },
      (error) => {
        console.log(error);
        if (error.error?.Errores?.email !== undefined) {
          this.errorEmail = error.error.Errores.email;
        } else {
          this.errorEmail = null;
        }
        if (error.error?.Errores?.password != undefined) {
          this.errorPassword = error.error.Errores.password;
        } else {
          this.errorPassword = null;
        }

        if (error.error?.msg !== undefined) {
          this.msgError = error.error.msg;
        } else {
          this.msgError = null;
        }
      }
    );
  }
}
