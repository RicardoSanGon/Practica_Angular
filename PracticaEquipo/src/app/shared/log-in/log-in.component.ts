import { Component } from '@angular/core';
import { UserLogIn } from '../../Core/Interfaces/user-log-in';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../Core/Services/User/users.service';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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

  constructor(
    private userService: UsersService,
    private router: Router
  ) {}

  public user: UserLogIn = {
    email: '',
    password: '',
  };
  isLoading: boolean =false;

  public submitForm() {
    if (!this.validateForm()) {
      return;
    }
    this.isLoading = true;
    this.userService.LogInUser(this.user).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        console.log('User logged in');
        this.router.navigate(['code/verification']);
      },
      (error) => {
        console.log(error);
        this.isLoading=false;
        if (error.error?.Errores?.email !== undefined) {
          this.errorEmail = error.error.Errores.email;
        } else {
          this.errorEmail = null;
        }
        if (error.error?.Errores?.password !== undefined) {
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

  private validateForm(): boolean {
    let isValid = true;
    if (!this.user.email || !this.isValidEmail(this.user.email)) {
      this.errorEmail = 'Ingrese un correo electrónico válido';
      isValid = false;
    } else {
      this.errorEmail = null;
    }
    if (!this.user.password || this.user.password.length < 4) {
      this.errorPassword = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    } else {
      this.errorPassword = null;
    }
    return isValid;
  }

  private isValidEmail(email: string): boolean {
    // Expresión regular para validar un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
