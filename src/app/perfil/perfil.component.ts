import { Component, OnInit, inject } from '@angular/core';
import { ApiCancionesService } from '../services/api-canciones.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { perfil } from '../Models/perfil';
import { NgFor } from '@angular/common';
import { SharedSongsService } from '../shared-songs.service';
import { Router, RouterLink } from '@angular/router';
import { stats } from '../Models/stats';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  idPerfil: number = 0;
  idUsuario : number = 0;
  fecha : string = '';
  stats : stats = {fechaReproduccion: this.fecha, idCancion: 0, idUsuario: 0}
  nombre: string = '';
  fotoPerfil: string = '';
  correo: string = '';
  url : string = '';
  public playlists : any [] = [];
  public songs : any [] = [];
  private _storage : Storage = inject(Storage);
constructor(
  private _apiService : ApiCancionesService, 
  private _share : SharedSongsService,
  private _router : Router
  ){


}
ngOnInit(): void {
  //this.nombre = this._apiService.userData.nombrePerfil;
  //this.fotoPerfil = this._apiService.userData.fotoPerfil;
  this.correo = this._apiService.userData.correo;
  this.idPerfil = this._apiService.userData.idPerfil;
  this.getPlaylists();
  this.getSongs();
  this.getProfile();
  const ahora = new Date();
  this.fecha = ahora.toLocaleString(); // O cualquier formato que prefieras
}

onProfileSelected(event : any){
  const onPicSelected : File = event.target.files[0];
  this.uploadPic(onPicSelected);
}

async uploadPic (file: File){
  const filePath = `content/profile_pictures/${file.name}`;
  const fileRef = ref (this._storage, filePath);
  const uploadFile = uploadBytesResumable(fileRef, file);
  uploadFile.on('state_changed',
  (Snapshot) =>{
    const progress = (Snapshot.bytesTransferred / Snapshot.totalBytes) * 100;
    if (progress === 100) {
      //this.uploadCompletedSong = true; // Habilitar el botón cuando el progreso alcanza el 100%
    }

  },
  (error) => {
    console.error(error);
  },
  async () =>{
    alert('Se subio el archivo');
    this.url = await getDownloadURL(fileRef);
    console.log(this.url);
    this.update();
  }
  )
}
update(){
  const per: perfil = {nombrePerfil : this.nombre, fotoPerfil : this.url }
  this._apiService.updateProfile(this.idPerfil, per).subscribe(x => {
    alert(x.message);
    console.log(x);
  })
}
getPlaylists(){
  this._apiService.getPlaylistByUser(this._apiService.userData.idUsuario.toString()).subscribe(x =>{
    this.playlists = x.data;
    console.log(x)
    console.log(this.playlists)
  })
}
getSongs(){
  this._apiService.getCancionByUser(this._apiService.userData.idUsuario).subscribe(x =>{
    this.songs = x.data;
    console.log(x);
  })
}
getProfile(){
  this._apiService.getProfileById(this._apiService.userData.idPerfil).subscribe(x => {
    this.nombre = x.data[0].nombrePerfil;
    this.fotoPerfil = x.data[0].fotoPerfil
  })
}
play(song: any){
  this._share.setSong(song);
  this.stats.idCancion = song.idCancion;
  this.stats.idUsuario = this._apiService.userData.idUsuario;
  this.stats.fechaReproduccion = this.fecha;
  this._apiService.addStats(this.stats).subscribe(x => {
    if(x.success === true){
      console.log(x);
    }
  })
}
deletePlaylist(pl: any){
if(confirm("¿Esta seguro de eliminar " + pl.nombre + '?') == true) {
  this._apiService.deletePlaylist(pl.id).subscribe(x =>{
    if(x.success === true){
      alert(x.message);
      window.location.reload();
    }
  })
}
}
data(data: any){
  this._share.setData(data);
  this._router.navigate(['/view']);
}
setQueue(queue: any){
  this._share.setSongs(queue.canciones);
}
disablePlaylist(pl: any){
  if(confirm("¿Esta seguro de archivar " + pl.nombre + '?') == true) {
    this._apiService.disablePlaylist(pl.id).subscribe(x =>{
      if(x.success === true){
        alert(x.message);
        window.location.reload();
      }
    })
  }
}
}
