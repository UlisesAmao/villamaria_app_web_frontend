import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserToken } from 'src/app/models/auth/user-token';
import { UserTokenSessionService } from './user-token-session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private _userTokenSessionService: UserTokenSessionService,
        private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._userTokenSessionService.getToken()) {
            const userToken: UserToken = this._userTokenSessionService.getToken();
            return true;
        } else {
            this._router.navigate(["auth"]);
            return false;
        }
    }
}
