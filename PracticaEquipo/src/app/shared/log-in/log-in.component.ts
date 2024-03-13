import { Component } from '@angular/core';
import {UserLogIn} from "../../Core/Interfaces/user-log-in";
import {FormsModule, NgModel} from "@angular/forms";
import {UsersService} from "../../Core/Services/User/users.service";
import {NgIf} from "@angular/common";
<<<<<<< HEAD
import { Router ,RouterModule } from '@angular/router';
=======
import {Router, RouterModule} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
>>>>>>> 8f52516fd76a96857b185325102c9cf6c8baf151

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  public errorEmail: string | null = null;
  public errorPassword: string | null = null;
<<<<<<< HEAD

  public constructor(private userService: UsersService, private router: Router) {
=======
  public msgError: string | null = null;
  public constructor(private userService: UsersService,
                     private router:Router) {
>>>>>>> 8f52516fd76a96857b185325102c9cf6c8baf151
  }
  public user: UserLogIn = {
    email: '',
    password: ''
  }


  public submitForm() {
    this.userService.LogInUser(this.user).subscribe(
      (response)=>{
        localStorage.setItem('token', response.token);
<<<<<<< HEAD
        console.log('logueado');

        this.router.navigate(['/navbar']);
=======
        this.router.navigate(['code/verification']);
>>>>>>> 8f52516fd76a96857b185325102c9cf6c8baf151
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

        if(error.error?.msg!==undefined)
        {
          this.msgError=error.error.msg
        }
        else
        {
          this.msgError=null
        }
      }
    );
  }
}
