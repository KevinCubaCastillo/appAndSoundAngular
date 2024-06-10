import { Component, inject } from '@angular/core';
import { SharedSongsService } from '../shared-songs.service';
import { Router, RouterLink } from '@angular/router';
import { ApiCancionesService } from '../services/api-canciones.service';
import { ApiAuthService } from '../services/api-auth.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Canciones } from '../Models/Canciones';
import { album } from '../Models/album';

@Component({
  selector: 'app-album-view',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink],
  templateUrl: './album-view.component.html',
  styleUrl: './album-view.component.css'
})
export class AlbumViewComponent {
  data : any;
  public songName: string = '';
  public artist: string = '';
  public url: string = '';
  public date: string = '';
  public album : album;
  public songs: Canciones[];
  cancionesActuales: any [] = [];
  uploadCompletedSong: boolean = false
  private _storage : Storage = inject(Storage);
  constructor(private _shared: SharedSongsService, private _router : Router, private _apiService : ApiCancionesService, private _apiAuth : ApiAuthService)
  {
    this._shared.getData.subscribe({
      next: x =>{
        this.data = x;
        console.log(this.data);
      }
    })
    if(this.data === null){
      this._router.navigate(['/perfil-list']);
    }
    this.cancionesActuales = this.data.canciones;
    this.artist = this.data.canciones[0].autor;
    this.date = this.data.fechaLanzamiento;
    console.log(this.cancionesActuales);
    this.songs = [];
    this.album = {nombre: '', fechaLanzamiento: '', portada: '', cancionList: []}
  }
  addCancion(){
    const newsong: Canciones = {
      nombre: this.songName,
      autor: this.artist,
      duracion: '3:50',
      url: this.url,
      fechaLanzamiento: this.date,
      idUsuario: this._apiAuth.userData!.idUsuario,
      idAlbum: this.data.idAlbum
    };

    this.songs.push(newsong);
    this.songName = '';
    this.url = '';
    this.uploadCompletedSong = false;
    console.log(this.songs)
  }
  addSongs(){
    this.album.cancionList = this.songs;
    if(this.songs.length === 0){
      alert("Debe subir al menos una cancion");
    }
    else{
      this._apiService.addAlbumNewSongs(this.data.idAlbum ,this.album).subscribe(x =>{
        if(x.success === true){
          alert(x.message);
          this._router.navigate(['/perfil-list'])
        }
      })
    }
  }
  deleteSong(song:any){
    if(confirm("¿Esta seguro de eliminar esta canción?") === true){
      this._apiService.deleteSong(song.idCancion).subscribe(x =>{
        alert(x.message);
        const index = this.cancionesActuales.findIndex(cancion => cancion.idCancion === song.idCancion);
        if (index !== -1) {
          this.cancionesActuales.splice(index, 1);
          if(this.cancionesActuales.length === 0){
            alert("No quedan canciones, se eliminara el Album");
            this._apiService.deleteAlbum(this.data.idAlbum).subscribe(x =>{
              alert(x.message);
              this._router.navigate(['/perfil-list']);
            })
          }
        }
      })
      }
  
  }
  onSongSelected(event : any){
    const onSongSelected : File = event.target.files[0];
    this.uploadSong(onSongSelected);
  }
  async uploadSong (file: File){
    const filePath = `content/Songs/${file.name}`;
    const fileRef = ref (this._storage, filePath);
    const uploadFile = uploadBytesResumable(fileRef, file);
    uploadFile.on('state_changed',
    (Snapshot) =>{
      const progress = (Snapshot.bytesTransferred / Snapshot.totalBytes) * 100;
      if (progress === 100) {
        this.uploadCompletedSong = true; // Habilitar el botón cuando el progreso alcanza el 100%
      }

    },
    (error) => {
      console.error(error);
    },
    async () =>{
      alert('Se subio el archivo');
      this.url = await getDownloadURL(fileRef);
      console.log(this.url);
    }
    )
  }
}
