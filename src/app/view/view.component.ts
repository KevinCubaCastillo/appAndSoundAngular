import { Component } from '@angular/core';
import { SharedSongsService } from '../shared-songs.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiCancionesService } from '../services/api-canciones.service';
import { stats } from '../Models/stats';
import { ApiAuthService } from '../services/api-auth.service';
import { pCanciones } from '../Models/pCanciones';
import { FormsModule } from '@angular/forms';
import { addNewSongs } from '../Models/addNewSongs';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
data : any;
username: string = '';
idusuario: number = 0;
nombre: string = '';
fecha : string = '';
public lst! : any[];
filtroCancion: string = '';
cancionesFiltradas: any[] = [];
newSongspl : addNewSongs;
public canciones: pCanciones[] = [];
public nuevasCanciones: pCanciones[] = [];

stats : stats = {fechaReproduccion: this.fecha, idCancion: 0, idUsuario: 0}
constructor(private _shared: SharedSongsService, private _router : Router, private _apiService : ApiCancionesService, private _apiAuth : ApiAuthService){
  this._shared.getData.subscribe({
    next: x =>{
      this.data = x;
      console.log(this.data);
    }
  })
  if(this.data === null){
    this._router.navigate(['/perfil-list']);
  }
  this._apiService.getProfileById(Number(this.data.id_usuario)).subscribe(x =>{
    this.username = x.data[0].nombrePerfil;
    console.log(x);
    console.log(this.username);
    console.log(this.idusuario);
    console.log(this.data.id_usuario);

  }
  )
  this.newSongspl = {canciones : []}
  this.canciones = this.data.canciones;
  console.log(this.canciones.length);
  this.nombre = this.data.nombre;
  this.getSongs();

}
deleteSong(song:any){
  if(confirm("¿Esta seguro de eliminar esta canción?") === true){
    this._apiService.deleteSongPlaylist(this.data.id, song.id.toString()).subscribe(x =>{
      alert(x.message);
      const index = this.canciones.findIndex(cancion => cancion.id === song.id);
      if (index !== -1) {
        this.canciones.splice(index, 1);
        if(this.canciones.length === 0){
          alert("No quedan canciones, se eliminara la playlist");
          this._apiService.deletePlaylist(this.data.id).subscribe(x =>{
            alert(x.message);
            this._router.navigate(['/perfil-list']);
          })
        }
      }
    })
    }

}

quitarCancion(song:any){
  const index = this.nuevasCanciones.findIndex(cancion => cancion.id === song.id);
  if (index !== -1) {
    this.nuevasCanciones.splice(index, 1);
  }
}
getSongs(){
  this._apiService.getCanciones().subscribe(x => {
    this.lst = x.data;
  })
}
addCancion(cancion : any){
  const nuevaCancion: pCanciones = {
    id: cancion.idCancion,
    nombre: cancion.nombre,
    imagen: cancion.portada,
    url: cancion.url,
    album: cancion.album,
    artista: cancion.autor
  };
  //this.nuevasCanciones.push(nuevaCancion);
  const cancionExistente = this.nuevasCanciones.find(c => c.id === nuevaCancion.id);
  const cancionAntExistente = this.canciones.find(c => c.id === nuevaCancion.id);

    if (!cancionExistente && !cancionAntExistente) {
      // Si la canción no existe, añadirla al array
      this.nuevasCanciones.push(nuevaCancion);
    } else {
      // Si la canción ya existe, puedes mostrar un mensaje o realizar otra acción
      alert(`${nuevaCancion.nombre} ya esta en la lista.`);
    }
}
nameChange(){
  this._apiService.playlistName(this.data.id, this.nombre).subscribe(x =>{
    alert(x.message);
  })
}
addSongsPlayList(){
  console.log(this.nuevasCanciones);
  this.newSongspl.canciones = this.nuevasCanciones;
  if(this.nuevasCanciones.length === 0){
    alert("Debe añadir canciones");
  }else{
    this._apiService.addSongsPlaylist(this.data.id, this.newSongspl).subscribe(x =>{
        alert(x.message);
        this._router.navigate(['/perfil-list'])
      
    })
  }
}
filtrarCanciones() {
  this.cancionesFiltradas = this.lst.filter(cancion =>
    cancion.nombre.toLowerCase().includes(this.filtroCancion.toLowerCase()) ||
    cancion.autor.toLowerCase().includes(this.filtroCancion.toLowerCase()) ||
    cancion.album.toLowerCase().includes(this.filtroCancion.toLowerCase())
  );
}
play(song: any){
  this._shared.setSong(song);
  this.stats.idCancion = song.idCancion;
  this.stats.idUsuario = this._apiAuth.userData!.idUsuario;
  this.stats.fechaReproduccion = this.fecha;
}
playQueue(){
  this._shared.setSongQueue(this.data.canciones);

}
}
