import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export const verifyJwt = (() => {
    return false;
  })


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected router: Router, protected authService: AuthenticationService) {

    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (state.url == '/login'){
            return true;
        }
        const jwt = localStorage.getItem("authtoken");
        if (!jwt || !this.authService.isAuthenticated(jwt)) {
            this.authService.logout();
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}