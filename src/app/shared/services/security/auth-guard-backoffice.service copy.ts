import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserToken } from 'src/app/models/auth/user-token';
import { UserTokenSessionService } from './user-token-session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardBackofficeService implements CanActivate {

    constructor(private _userTokenSessionService: UserTokenSessionService,
        private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const userToken: UserToken = this._userTokenSessionService.getToken();
        console.log(userToken, "jjjjj");
        if (userToken.userBD.id_perfil == 1) {
            return true;
        }
        return false;
    }
}
