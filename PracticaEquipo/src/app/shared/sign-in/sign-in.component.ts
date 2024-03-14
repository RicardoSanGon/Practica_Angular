import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { UserForm } from '../../Core/Interfaces/user-form';
import { UsersService } from '../../Core/Services/User/users.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FormsModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  user: UserForm = {
    name: '',
    email: '',
    password: '',
  };
  public errorEmail: String | null = null;
  public errorName: String | null = null;
  public errorPassword: String | null = null;
  constructor(private usersService: UsersService, private router: Router) {}

  submitForm() {
    this.usersService.createUser(this.user).subscribe(
      (response) => {
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.error?.Errores?.email) {
          this.errorEmail = error.error.Errores.email;
        }
        if (error.error?.Errores?.name) {
          this.errorName = error.error.Errores.name;
        }
        if (error.error?.Errores?.password) {
          this.errorPassword = error.error.Errores.password;
        } else {
          this.errorEmail = null;
          this.errorName = null;
          this.errorPassword = null;
        }

        console.log(error);
      }
    );
  }
}
