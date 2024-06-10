import { Component, OnInit, inject } from '@angular/core';
import { ApiCancionesService } from '../services/api-canciones.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { perfil } from '../Models/perfil';
import { NgFor, NgIf } from '@angular/common';
import { SharedSongsService } from '../shared-songs.service';
import { Router, RouterLink } from '@angular/router';
import { stats } from '../Models/stats';
import { ApiAuthService } from '../services/api-auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf],
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
  public albums : any [] = [];
  public likeSongDetails : any [] = [];
  public userSongs : any [] = [];
  likedSongs : any [] = [];

  private _storage : Storage = inject(Storage);
constructor(
  private _apiService : ApiCancionesService, 
  private _apiAuth: ApiAuthService,
  private _share : SharedSongsService,
  private _router : Router
  ){
}
ngOnInit(): void {
  //this.nombre = this._apiService.userData.nombrePerfil;
  //this.fotoPerfil = this._apiService.userData.fotoPerfil;
  this.correo = this._apiAuth.userData!.correo;
  this.idPerfil = this._apiAuth.userData!.idPerfil;
  this.getPlaylists();
  this.getSongs();
  this.getAlbums();
  this.getProfile();
  this.loadData();
  const ahora = new Date();
  this.fecha = ahora.toLocaleString(); // O cualquier formato que prefieras
}

onProfileSelected(event : any){
  const onPicSelected : File = event.target.files[0];
  this.uploadPic(onPicSelected);
}

loadData() {
  forkJoin({
    userLikes: this._apiService.getUserLikes(this._apiAuth.userData!.idUsuario.toString()),
    likeSongs: this._apiService.getCanciones()
  }).subscribe(({ userLikes, likeSongs }) => {
    this.userSongs = userLikes.data;
    console.log(this.userSongs);
    this.likeSongDetails = likeSongs.data;
    this.filterSongs();
  });
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
  this._apiService.getPlaylistByUser(this._apiAuth.userData!.idUsuario.toString()).subscribe(x =>{
    this.playlists = x.data;
    console.log(x)
    console.log(this.playlists)
  })
}
getPlaylistsInactive(){
  this._apiService.getPlaylistByUserInactive(this._apiAuth.userData!.idUsuario.toString()).subscribe(x =>{
    this.playlists = x.data;
    console.log(x)
    console.log(this.playlists)
  })
}
getSongs(){
  this._apiService.getCancionByUser(this._apiAuth.userData!.idUsuario).subscribe(x =>{
    this.songs = x.data;
    console.log(x);
  })
}
getAlbums(){
  this._apiService.getAlbumsByUser(this._apiAuth.userData!.idUsuario).subscribe(x =>{
    this.albums = x.data;
    console.log(x);
  })
}
filterSongs() {
  const songIds = this.userSongs.map(userSong => userSong.cancion);
    
    // Filtra las canciones que están en el array de ids
    const filteredSongDetails = this.likeSongDetails.filter(songDetail => songIds.includes(songDetail.idCancion.toString()));
    
    // Mantén el id del like en el array resultante
    this.likedSongs = this.userSongs.map(userSong => {
      const songDetail = this.likeSongDetails.find(songDetail => songDetail.idCancion.toString() === userSong.cancion);
      return {
        ...songDetail,
        idLike: userSong.id // Asumiendo que 'id' es el campo del like en userSongs
      };
    }).filter(song => song !== undefined); // Filtrar posibles valores undefined

    console.log(this.likedSongs);
}
public(song: any){
  console.log(song.idLike)
  if(song.publico){
    if(confirm("¿Hacer privado?") == true) {
      this._apiService.playlistPublic(song.id, 'false').subscribe(x =>{
        if(x.success === true){
          alert(x.message);
          this.getPlaylists();
        }
      })
  }
}
else{ 
  if(confirm("¿Hacer publico?") == true) {
    this._apiService.playlistPublic(song.id, 'true').subscribe(x =>{
      if(x.success === true){
        alert(x.message);
        this.getPlaylists();
      }
    })
}

}
}
dislike(song: any){
  if(confirm("¿Esta seguro de eliminar " + song.nombre + ' de sus favoritos?') == true) {
    this._apiService.deleteLike(song.idLike).subscribe(x =>{
      if(x.success === true){
        alert(x.message);
        this.loadData();
      }
    })
  }
}
playAll(){
  this._share.setSongQueue(this.likedSongs);
}
getProfile(){
  this._apiService.getProfileById(this._apiAuth.userData!.idPerfil).subscribe(x => {
    this.nombre = x.data[0].nombrePerfil;
    this.fotoPerfil = x.data[0].fotoPerfil
  })
}
play(song: any){
  this._share.setSong(song);
  this.stats.idCancion = song.idCancion;
  this.stats.idUsuario = this._apiAuth.userData!.idUsuario;
  this.stats.fechaReproduccion = this.fecha;
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
deleteSong(song: any){
  if(confirm("¿Esta seguro de eliminar " + song.nombre + "?")== true){
    this._apiService.deleteSong(song.idCancion).subscribe(x =>{
      if(x.success){
        alert(x.message);
        this.getSongs();
      }
    })
  }
}
deletealbum(album: any){
  if(confirm("¿Esta seguro de eliminar " + album.nombre + "?")== true){
    this._apiService.deleteAlbum(album.idAlbum).subscribe(x =>{
      if(x.success){
        alert(x.message);
        this.getAlbums();
      }
    })
  }
}
data(data: any){
  this._share.setData(data);
  this._router.navigate(['/view']);
}
albumData(data: any){
  this._share.setData(data);
  this._router.navigate(['/album-view']);
}
setQueue(queue: any){
  if(queue.estado){
    this._share.setSongQueue(queue.canciones);
  }else{
    alert('La playlist debe estar activa para reproducirse.');
  }
}
setAlbumQueue(queue: any){
   this._share.setSongQueue(queue.canciones);
}
disablePlaylist(pl: any){
  if(pl.estado){
    if(confirm("¿Esta seguro de archivar " + pl.nombre + '?') == true) {
      this._apiService.disablePlaylist(pl.id).subscribe(x =>{
        if(x.success === true){
          alert(x.message);
          this.getPlaylists();
        }
      })
    }
  }else{
    this._apiService.activePlaylist(pl.id).subscribe(x =>{
      if(x.success === true){
        alert(x.message);
        this.getPlaylistsInactive();
      }
    })
  }
  
}
}
