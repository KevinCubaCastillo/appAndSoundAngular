import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiCancionesService } from "../services/api-canciones.service";
import { Observable, finalize } from "rxjs";
import { ApiAuthService } from "../services/api-auth.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable()
export class jwtInterceptor implements HttpInterceptor{
    constructor(private _apiService : ApiAuthService, private _loader : NgxUiLoaderService){

    }
    private _activeRequest = 0;
    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
        if(this._activeRequest === 0){
            this._loader.start();
        }
        this._activeRequest++;
        const usuario = this._apiService.userData;
        if(usuario){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuario.token}`
                }
            });
        }
        return next.handle(request).pipe(finalize(() => this.stopLoader()));
    }
    private stopLoader(){
        this._activeRequest--;
        if(this._activeRequest === 0){
            this._loader.stop();
        }
    }
}

/*export class jwtInterceptor implements HttpInterceptor{
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
}*/