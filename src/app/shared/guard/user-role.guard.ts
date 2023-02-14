import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTAuthService } from '../services/auth/jwtauth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  constructor(private router: Router,
     private jwtAuth: JWTAuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var user = this.jwtAuth.getUser();
    return true;
  }

}
