import { Component, OnInit } from '@angular/core';
import { ApiCancionesService } from '../services/api-canciones.service';
import { NgFor } from '@angular/common';
import { SharedSongsService } from '../shared-songs.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { stats } from '../Models/stats';
import { ApiAuthService } from '../services/api-auth.service';
import { like } from '../Models/like';
import { catchError, of } from 'rxjs';
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
  public lstPlaylist!: any[]
  fecha : string = '';
  stats : stats = {fechaReproduccion: this.fecha, idCancion: 0, idUsuario: 0}
  filtroCancion: string = "";
  filtroAlbum: string = "";
  filtroplaylist: string = "";
  cancionesFiltradas: any[] = [];
  albumesFiltrados: any[] = [];
  playlistFiltrados: any[] = [];
  nombreRep: string='';
  public lstMeGusta! : any[];
  user: any;
constructor(
  private _router: Router,
  private _apiCanciones : ApiCancionesService,
  private _apiAuth : ApiAuthService,
  private _share : SharedSongsService
){
  this.lstMeGusta = []; 

}
ngOnInit(): void {
  this.getCanciones();
  this.getAlbums();
  this.getPlaylists();
  this.user = this._apiAuth.userData;
  const ahora = new Date();
  this.fecha = ahora.toLocaleString(); // O cualquier formato que prefieras
}



getCanciones(){
  this._apiCanciones.getCanciones().subscribe(x => {
    this.lst = x.data;
    this.cancionesFiltradas = this.lst;
  })
}

getAlbums(){
  this._apiCanciones.getAlbums().subscribe(x => {
    this.lstAlb = x.data;
    this.albumesFiltrados = this.lstAlb;
    console.log(x)
  })
}
getPlaylists(){
  this._apiCanciones.getPlaylistsActive().subscribe(x =>{
    this.lstPlaylist = x.data;
    this.playlistFiltrados = this.lstPlaylist;
    console.log(this.lstPlaylist);
  })
}
playSong(song: any){
  this._share.setSong(song);
  this.stats.idCancion = song.idCancion;
  this.stats.idUsuario = this._apiAuth.userData!.idUsuario;
  this.stats.fechaReproduccion = this.fecha;
  //this.router.navigate(['/reproductor-list']);
}
playSongQueue(queue: any){
  this._share.setSongQueue(queue.canciones);

}

filtrarCanciones() {
  this.nombreRep = '';
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
filtrarPlaylists(){
  this.playlistFiltrados = this.lstPlaylist.filter(c =>
    c.nombre.toLowerCase().includes(this.filtroplaylist.toLocaleLowerCase()));
}

filtrarCancionesporBoton(nombre: string) {
  this.cancionesFiltradas = this.lst.filter(cancion =>
    cancion.album.toLowerCase().includes(nombre.toLowerCase())
  );
  this.nombreRep= nombre;
}

addMeGusta(song: any) {
  // Agrega la canción a lstMeGusta
  const like : like = {cancion: '', id_usuario: this._apiAuth.userData!.idUsuario.toString()}
  like.cancion = song.idCancion.toString();
  console.log(like);
  this._apiCanciones.addLike(like).pipe(
    catchError(error => {
      if (error.status === 500) {
        alert("Esta canción ya esta en tus me gusta.");
      } else {
        alert("Ocurrió un error. Por favor, intenta nuevamente.");
      }
      // Return an observable with a user-facing error message
      return of({ success: false });
    })
  ).subscribe(x => {
    if (x.success === true) {
      alert("Se añadió la canción " + song.nombre + " a tus me gusta");
    }
  });
}

subirContenido(){
  this._router.navigate(['/playlist-list']);
}


}
