import { Component, OnInit } from '@angular/core';
import { ApiCancionesService } from '../services/api-canciones.service';
import { FormsModule } from '@angular/forms';
import { usuario } from '../Models/usuario';
import { Router } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { ApiAuthService } from '../services/api-auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public nombre : string = '';
  public correo : string = '';
  public contra : string = '';
  public loginEmail: string = '';
  public loginPassword: string = '';

constructor(
  private _apiusuario: ApiCancionesService,
  private _apiAuth: ApiAuthService,
  private _router: Router
){
  const user = this._apiAuth.userData;
  if(user){
    this._router.navigate(['/'])
  }
}
ngOnInit(): void {

}
addusuario(){
  if (!this.nombre || !this.correo || !this.contra) {
    // Mostrar mensaje de alerta si algún campo está vacío
    alert('Por favor, complete todos los campos.');
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.correo)) {
    // Mostrar mensaje de alerta si el correo electrónico no tiene un formato válido
    alert('Por favor, ingrese un correo electrónico válido.');
    return;
  }
  const user : usuario = {nombre : this.nombre, correoElectronico : this.correo, contrasenia : this.contra};
  this._apiusuario.addUsuario(user).subscribe(x => {
    console.log(x.message);
    alert(x.message);
  },
  error => {
    // Mostrar mensaje de alerta si hay un error en la llamada al servicio
    alert('Ocurrió un error al agregar el usuario. Por favor, inténtelo de nuevo más tarde.');
  }
)

}

login(){
  const user: usuario = {nombre: '', correoElectronico: this.loginEmail, contrasenia: this.loginPassword}
  this._apiAuth.login(user).subscribe(x =>{
    alert(x.message);
    this._router.navigate(['/'])
    window.location.reload();
  })
}
}
