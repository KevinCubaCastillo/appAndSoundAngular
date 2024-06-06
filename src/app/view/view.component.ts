import { Component } from '@angular/core';
import { SharedSongsService } from '../shared-songs.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ApiCancionesService } from '../services/api-canciones.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
data : any;
username: string = '';
idusuario: number = 0;
constructor(private _shared: SharedSongsService, private _router : Router, private _apiService : ApiCancionesService){
  this._shared.getData.subscribe({
    next: x =>{
      this.data = x;
      console.log('Datos' + this.data);
    }
  })
  if(this.data === null){
    this._router.navigate(['/Inicio-list']);
  }
  this._apiService.getProfileById(Number(this.data.id_usuario)).subscribe(x =>{
    this.username = x.data[0].nombrePerfil;
    console.log(x);
    console.log(this.username);
    console.log(this.idusuario);
    console.log(this.data.id_usuario);

  }
  )
}
}
