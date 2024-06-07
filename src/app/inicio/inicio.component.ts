import { Component } from '@angular/core';
import { ApiCancionesService } from '../services/api-canciones.service';
import { userLogin } from '../Models/userLogin';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

constructor(
){

}
  
}
