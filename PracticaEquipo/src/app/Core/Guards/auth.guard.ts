import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from '../Services/User/users.service';
import { IsAdmin } from '../Interfaces/is-admin';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.usersService.is_Auth().pipe(
      map((result) => {
        if (result.is_Auth) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    )
  }
}
