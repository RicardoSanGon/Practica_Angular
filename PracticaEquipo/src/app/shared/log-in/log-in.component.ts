import { Component } from '@angular/core';
import {UserLogIn} from "../../Core/Interfaces/user-log-in";
import {FormsModule, NgModel} from "@angular/forms";
import {UsersService} from "../../Core/Services/User/users.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  public errorEmail: string | null = null;
  public errorPassword: string | null = null;
  public constructor(private userService: UsersService) {
  }
  public user: UserLogIn = {
    email: '',
    password: ''
  }


  public submitForm() {
    this.userService.LogInUser(this.user).subscribe(
      (response)=>{
        localStorage.setItem('token', response.token);
      },
      (error)=>{
        this.errorEmail = error.Errores.email;
        this.errorPassword = error.Errores.password;
      }
    );
  }
}
