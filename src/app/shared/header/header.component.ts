import { Component, OnInit } from '@angular/core';
import { ApiCancionesService } from '../../services/api-canciones.service';
import { Route, Router, RouterLink } from '@angular/router';
import { ApiAuthService } from '../../services/api-auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',

})
export class HeaderComponent implements OnInit{
nombre: string = '';
fotoPerfil: string = '';
UserLoginOn: boolean = false;
user : any;
profile: any;
constructor (private _apiService: ApiCancionesService, private _apiAuth: ApiAuthService, private _router : Router){
}
ngOnInit(): void {
  this.user = this._apiAuth.userData;
  this.getProfile();
if(this.user){
  this.UserLoginOn = true;
}
}
logout(){
  this._apiAuth.logout();
  this._router.navigate(['/Login-list'])
  window.location.reload();
}
getProfile(){
  this._apiService.getProfileById(this._apiAuth.userData!.idPerfil).subscribe(x =>{
    this.profile = x.data[0];
    this.nombre = this.profile.nombrePerfil;
    this.fotoPerfil = this.profile.fotoPerfil;
    console.log(this.profile);
  })
}
}
