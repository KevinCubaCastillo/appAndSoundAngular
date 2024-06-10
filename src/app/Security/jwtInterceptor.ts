import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiCancionesService } from "../services/api-canciones.service";
import { Observable } from "rxjs";
import { ApiAuthService } from "../services/api-auth.service";

@Injectable()
export class jwtInterceptor implements HttpInterceptor{
    constructor(private _apiService : ApiAuthService){

    }
    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
        const usuario = this._apiService.userData;
        if(usuario){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuario.token}`
                }
            });
        }
        return next.handle(request);
    }
}