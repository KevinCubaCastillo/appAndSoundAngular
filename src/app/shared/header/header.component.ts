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
constructor (private _apiService: ApiCancionesService, private _router : Router){
}
ngOnInit(): void {
  this.user = this._apiService.userData;
  this.nombre = this._apiService.userData.nombrePerfil;
if(this.user){
  this.UserLoginOn = true;
}
  this.fotoPerfil = this._apiService.userData.fotoPerfil;
}
logout(){
  this._apiService.logout();
  this._router.navigate(['/Login-list'])
  window.location.reload();
}
}
