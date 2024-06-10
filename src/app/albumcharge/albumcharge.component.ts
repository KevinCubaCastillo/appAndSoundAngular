import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { album } from '../Models/album';
import { Canciones } from '../Models/Canciones';
import { CommonModule, NgFor } from '@angular/common';
import { ApiCancionesService } from '../services/api-canciones.service';
import { Storage, StorageErrorCode, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { getHeapSnapshot } from 'v8';
import { error } from 'console';
import { Router, RouterLink } from '@angular/router';
import { ApiAuthService } from '../services/api-auth.service';

@Component({
  selector: 'app-albumcharge',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink],
  templateUrl: './albumcharge.component.html',
  styleUrl: './albumcharge.component.css'
})
export class AlbumchargeComponent {
  uploadCompleted: boolean = false;
  uploadCompletedSong: boolean = false
  uploadProgress$!: Observable<number>;
  downloadURL$!: Observable<string>;
  public progressBarValue: number = 0;
  public album : album;
  public songs: Canciones[];
  public songName: string = '';
  public artist: string = '';
  public url: string = '';
  public date: string = '';
  public albumName: string = '';
  public albumDate: string = '';
  public albumUrl: string = '';
  private _storage : Storage = inject(Storage);
  constructor (
    private _formBuilder: FormBuilder,
    private _apiService : ApiCancionesService,
    private _router : Router,
    private _apiAuth : ApiAuthService
  ){
    this.songs = [];
    this.album = {nombre: '', fechaLanzamiento: '', portada: '', cancionList: []}
    this.albumDate = new Date().toISOString().substring(0, 10);
    this.date = new Date().toISOString().substring(0, 10);
  }
  addCancion(){
    const newsong: Canciones = {
      nombre: this.songName,
      autor: this.artist,
      duracion: '3:50',
      url: this.url,
      fechaLanzamiento: this.date,
      idUsuario: this._apiAuth.userData!.idUsuario,
      idAlbum: 1
    };

    this.songs.push(newsong);
    this.songName = '';
    this.url = '';
    this.uploadCompletedSong = false;
    console.log(this.songs)
  }
  onCoverSelected(event : any){
    const coverSelected : File = event.target.files[0];
    this.uploadCover(coverSelected);
    console.log(coverSelected);
  }
  async uploadCover (file: File){
    const filePath = `content/cover_picture/${file.name}`;
    const fileRef = ref (this._storage, filePath);
    const uploadFile = uploadBytesResumable(fileRef, file);
    uploadFile.on('state_changed',
    (Snapshot) =>{
      const progress = (Snapshot.bytesTransferred / Snapshot.totalBytes) * 100;
      if (progress === 100) {
        this.uploadCompleted = true; // Habilitar el botón cuando el progreso alcanza el 100%
      }

    },
    (error) => {
      console.error(error);
    },
    async () =>{
      alert('Se subio el archivo');
      this.albumUrl = await getDownloadURL(fileRef);
      console.log(this.albumUrl);
    }
    )
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
  addVenta(){
    this.album.cancionList = this.songs;
    this.album.nombre = this.albumName;
    this.album.fechaLanzamiento = this.albumDate;
    this.album.portada = this.albumUrl;
    if(this.songs.length === 0){
      alert("Debe subir al menos una cancion");
    }
    else{
      this._apiService.addAlbumSong(this.album).subscribe(x =>{
        if(x.success === true){
          alert(x.message);
          console.log("Registrado con exito");
          this._router.navigate(['/perfil-list'])
        }
      })
    }
  }
}
