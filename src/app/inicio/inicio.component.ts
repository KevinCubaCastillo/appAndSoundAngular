import { Component } from '@angular/core';
import { ApiCancionesService } from '../services/api-canciones.service';
import { userLogin } from '../Models/userLogin';
import { RouterLink } from '@angular/router';
import { ApiAuthService } from '../services/api-auth.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

constructor(private _apiAuth: ApiAuthService
){
  const user = this._apiAuth.userData;
  if(user === null){
    console.log("No hay nada, cagas");
  }else
  {
    console.log(user);
  }
}
}
