import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private route : Router,        
        private accountService : AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.accountService.isAuthenticated()){
            return true;
        }
        this.route.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}