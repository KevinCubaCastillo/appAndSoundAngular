import { Component, OnInit } from '@angular/core';
import { ApiCancionesService } from '../../services/api-canciones.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',

})
export class HeaderComponent implements OnInit{
nombre: string = '';
fotoPerfil: string = '';
UserLoginOn: boolean = false;
user : any;
profile: any;
constructor (private _apiService: ApiCancionesService, private _router : Router){
}
ngOnInit(): void {
  this.user = this._apiService.userData;
  this.getProfile();
if(this.user){
  this.UserLoginOn = true;
}
}
logout(){
  this._apiService.logout();
  this._router.navigate(['/Login-list'])
  window.location.reload();
}
getProfile(){
  this._apiService.getProfileById(this._apiService.userData.idPerfil).subscribe(x =>{
    this.profile = x.data[0];
    this.nombre = this.profile.nombrePerfil;
    this.fotoPerfil = this.profile.fotoPerfil;
    console.log(this.profile);
  })
}
}
