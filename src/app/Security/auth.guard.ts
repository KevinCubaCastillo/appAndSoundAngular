import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { ApiCancionesService } from "../services/api-canciones.service";
import { ApiAuthService } from "../services/api-auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

constructor(private _router : Router, private _apiService : ApiAuthService){
}
canActivate(route : ActivatedRouteSnapshot){
    const usuario = this._apiService.userData;
    if(usuario){
        return true;
    }
    this._router.navigate(['/Login-list']);
    return false;
}
}