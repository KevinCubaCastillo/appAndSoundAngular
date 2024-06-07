import { Component, OnInit } from '@angular/core';
import { ApiCancionesService } from '../services/api-canciones.service';
import { album } from '../Models/album';
import { FormsModule } from '@angular/forms';
import { Location, NgFor } from '@angular/common';
import { pCanciones } from '../Models/pCanciones';
import { url } from 'inspector';
import { playlist } from '../Models/playlist';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-playlist',
  standalone: true,
  imports: [FormsModule,NgFor, RouterLink],
  templateUrl: './crear-playlist.component.html',
  styleUrl: './crear-playlist.component.css'
})
export class CrearPlaylistComponent implements OnInit{
  public nombre: string = '';
  public fecha : string = '';
  public publico: boolean = false;
  public lst! : any[];
  public lst2! : any[];
  public canciones: pCanciones[] = [];
  public playlist: playlist;
  filtroCancion: string = '';
  cancionesFiltradas: any[] = [];
  constructor(
    private _apiService: ApiCancionesService,
    private _router: Router,
    private location: Location
  ){
    this.canciones = [];
    this.playlist = {nombre: '', id_usuario : '', publico: false, canciones: []}
  }  
  ngOnInit(): void {
    this.getSongs();
    this.getPlaylists();
    this.cancionesFiltradas = this.lst;
    const ahora = new Date();
    this.fecha = ahora.toLocaleString(); // O cualquier formato que prefieras
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
    this.canciones.push(nuevaCancion);
  }
  getSongs(){
    this._apiService.getCanciones().subscribe(x => {
      this.lst = x.data;
    })
  }

  filtrarCanciones() {
    this.cancionesFiltradas = this.lst.filter(cancion =>
      cancion.nombre.toLowerCase().includes(this.filtroCancion.toLowerCase()) ||
      cancion.autor.toLowerCase().includes(this.filtroCancion.toLowerCase()) ||
      cancion.album.toLowerCase().includes(this.filtroCancion.toLowerCase())
    );
  }
  addPlayList(){
    this.playlist.nombre = this.nombre;
    this.playlist.publico = this.publico;
    this.playlist.id_usuario = this._apiService.userData.idUsuario.toString();
    this.playlist.canciones = this.canciones;
    console.log(this.playlist)
    if(this.canciones.length === 0){
      alert('Debe seleccionar al menos una canción');
    }else{
      this._apiService.addPlaylist(this.playlist).subscribe(x =>{
        if(x.success === true){
          alert(x.message)
          this._router.navigate(['/Biblioteca-list'])
          window.location.reload();
        }
        else{
          alert(x.message)
          window.location.reload();
        }
      })
    }
  }
getPlaylists(){
  this._apiService.getPlaylistsActive().subscribe(x =>{
    this.lst2 = x.data;
    console.log(x);
  })
}
goBack(): void {
  this.location.back();
}
  }
