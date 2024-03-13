import { Component } from '@angular/core';
import {UserLogIn} from "../../Core/Interfaces/user-log-in";
import {FormsModule, NgModel} from "@angular/forms";
import {UsersService} from "../../Core/Services/User/users.service";
import {NgIf} from "@angular/common";
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
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
        console.log('logeado');
      },
      (error)=>{
        console.log(error)
        if(error.error?.Errores?.email !== undefined ){
          this.errorEmail=error.error.Errores.email
        }
        else
        {
          this.errorEmail=null
        }
        if(error.error?.Errores?.password != undefined){
          this.errorPassword=error.error.Errores.password
        }
        else
        {
          this.errorPassword=null
        }
      }
    );
  }
}
