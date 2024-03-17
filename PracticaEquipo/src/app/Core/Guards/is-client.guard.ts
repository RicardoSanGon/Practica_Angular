import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from '../Services/User/users.service';

@Injectable({
  providedIn: 'root'
})
export class IsClientGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.usersService.isClient().pipe(
      map((result) => {
        if (result.is_client) {
          return true;
        } else {
          this.router.navigate(['navbar/tab-Catalogo']);
          return false;
        }
      })
    )
  }
}
