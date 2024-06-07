import { Component, OnInit } from '@angular/core';
import { ApiCancionesService } from '../services/api-canciones.service';
import { NgFor } from '@angular/common';
import { SharedSongsService } from '../shared-songs.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { stats } from '../Models/stats';
@Component({
  selector: 'app-biblioteca-canciones',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink],
  templateUrl: './biblioteca-canciones.component.html',
  styleUrl: './biblioteca-canciones.component.css'
})
export class BibliotecaCancionesComponent implements OnInit{
  public lst! : any[]
  public lstAlb! : any[]
  fecha : string = '';
  stats : stats = {fechaReproduccion: this.fecha, idCancion: 0, idUsuario: 0}
  filtroCancion: string = '';
  filtroAlbum: string = '';
  cancionesFiltradas: any[] = [];
  albumesFiltrados: any[] = [];
  nombreRep: string='';
  public lstMeGusta! : any[];
  user: any;
constructor(
  private _router: Router,
  private _apiCanciones : ApiCancionesService,
  private _share : SharedSongsService
){
  this.lstMeGusta = []; 

}
ngOnInit(): void {
  this.getCanciones();
  this.getAlbums();
  this.cancionesFiltradas = this.lst;
  this.albumesFiltrados = this.lstAlb;
  this.user = this._apiCanciones.userData;
  const ahora = new Date();
  this.fecha = ahora.toLocaleString(); // O cualquier formato que prefieras
}



getCanciones(){
  this._apiCanciones.getCanciones().subscribe(x => {
    this.lst = x.data;
  })
}

getAlbums(){
  this._apiCanciones.getAlbums().subscribe(x => {
    this.lstAlb = x.data;
    console.log(x)
  })
}

playSong(song: any){
  this._share.setSong(song);
  this.stats.idCancion = song.idCancion;
  this.stats.idUsuario = this._apiCanciones.userData.idUsuario;
  this.stats.fechaReproduccion = this.fecha;
  this._apiCanciones.addStats(this.stats).subscribe(x => {
    if(x.success === true){
      console.log(x);
    }
  })
  //this.router.navigate(['/reproductor-list']);
}


filtrarCanciones() {
  this.cancionesFiltradas = this.lst.filter(cancion =>
    cancion.nombre.toLowerCase().includes(this.filtroCancion.toLowerCase()) ||
    cancion.autor.toLowerCase().includes(this.filtroCancion.toLowerCase()) ||
    cancion.album.toLowerCase().includes(this.filtroCancion.toLowerCase())
  );
}
filtrarAlbumes(){
  this.albumesFiltrados = this.lstAlb.filter(c =>
    c.album.toLowerCase().includes(this.filtroAlbum.toLocaleLowerCase()));
}

filtrarCancionesporBoton(nombre: string) {
  this.cancionesFiltradas = this.lst.filter(cancion =>
    cancion.album.toLowerCase().includes(nombre.toLowerCase())
  );
  this.nombreRep= nombre;
}

addMeGusta(song: any) {
  // Agrega la canción a lstMeGusta
  this.lstMeGusta.push(song);
}

mostrarMeGusta() {
  this.cancionesFiltradas = this.lstMeGusta;
}
subirContenido(){
  this._router.navigate(['/playlist-list']);
}

}
