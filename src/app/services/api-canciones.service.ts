import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Response } from '../Models/Response';
import { usuario } from '../Models/usuario';
import { album } from '../Models/album';
import { userLogin } from '../Models/userLogin';
import { perfil } from '../Models/perfil';
import { playlist } from '../Models/playlist';
import { stats } from '../Models/stats';
import { like } from '../Models/like';
import { pCanciones } from '../Models/pCanciones';
import { addNewSongs } from '../Models/addNewSongs';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiCancionesService {
  url: string = 'https://7jrdevxgdk.execute-api.us-east-1.amazonaws.com/Deployment/api/'
  //url2: string = 'https://api-playlists.onrender.com/api/'
  url3: string = 'https://apilikesandino.onrender.com/api/'
  url2: string = 'https://7jrdevxgdk.execute-api.us-east-1.amazonaws.com/Deployment/api/'
  constructor(
    private _http: HttpClient
  ) { 

  }
  getCanciones():Observable<Response>{
    return this._http.get<Response>(this.url + 'Canciones/getAllsongs');
  }
  getAlbums():Observable<Response>{
    return this._http.get<Response>(this.url + 'Canciones/getAllalbums')
  }
  addUsuario(user: usuario):Observable<Response>{
    return this._http.post<Response>(this.url + 'Usuarios/registrarUsuario', user, httpOptions)
  }
  getCancionById(id: number):Observable<Response>{
    return this._http.get<Response>(this.url + 'Canciones/getSongById/' + id)
  }
  getCancionByUser(id:number):Observable<Response>{
    return this._http.get<Response>(this.url + 'Canciones/getSongsByUser/' + id)
  }
  addAlbumSong(album : album):Observable<Response>{
    return this._http.post<Response>(this.url + 'Canciones/addAlbumSong', album, httpOptions)
  }
  addAlbumNewSongs(id: number, album : album):Observable<Response>{
    return this._http.post<Response>(this.url + 'Canciones/addAlbumNewSong/' + id, album, httpOptions)
  }
  getProfileById(id: number):Observable<Response>{
    return this._http.get<Response>(this.url + 'Perfil/profileById/'+ id)
  }
  updateProfile(id:number, perfil : perfil):Observable<Response>{
    return this._http.patch<Response>(this.url + 'Perfil/updateProfile/' + id, perfil ,httpOptions)
  }
  getPlaylistsActive():Observable<Response>{
    return this._http.get<Response>(this.url2 + 'listas/getAllListsActive')
  }
  getPlaylistByUser(id: string):Observable<Response>{
    return this._http.get<Response>(this.url2 + 'listas/getListsUserId/' + id)
  }
  getPlaylistByUserInactive(id: string):Observable<Response>{
    return this._http.get<Response>(this.url2 + 'listas/getListsUserIdInactive/' + id)
  }
  addPlaylist(pl : playlist):Observable<Response>{
    return this._http.post<Response>(this.url2 + 'listas/addListWithSong', pl, httpOptions);
  }
  addSongsPlaylist(id: string, canciones: addNewSongs):Observable<Response>{
    return this._http.post<Response>(this.url2 + 'listas/addSongs/' + id, canciones, httpOptions);
  }

  disablePlaylist(id: string):Observable<Response>{
    return this._http.patch<Response>(this.url2 + 'listas/deactivatePlaylist/' + id, httpOptions);
  }
  activePlaylist(id: string):Observable<Response>{
    return this._http.patch<Response>(this.url2 + 'listas/activatePlaylist/' + id, httpOptions);
  }
  deletePlaylist(id: string):Observable<Response>{
    return this._http.delete<Response>(this.url2 + 'listas/deletePlaylist/' + id);
  }
  deleteSongPlaylist(idList: string, idSong: string):Observable<Response>{
    return this._http.delete<Response>(this.url2 + 'listas/deleteSong/' + idList +'/' + idSong);
  }
  addStats(stat : stats):Observable<Response>{
    return this._http.post<Response>(this.url + 'Stats/addReproduccion' , stat, httpOptions)
  }
  getStatsStory(id: number):Observable<Response>{
    return this._http.get<Response>(this.url + 'Stats/getStatsByUser/' + id)
  }
  getStats(id: number):Observable<Response>{
    return this._http.get<Response>(this.url + 'Stats/countBySong/' + id)
  }
  addLike(like: like):Observable<Response>{
    return this._http.post<Response>(this.url2 + 'likes/addLike', like, httpOptions);
  }
  getUserLikes(id: string):Observable<Response>{
    return this._http.get<Response>(this.url2 + 'likes/getByUser/' + id)
  }
  deleteLike(id: string):Observable<Response>{
    return this._http.delete<Response>(this.url2 + 'likes/delete/' + id);
  }
  playlistPublic(id: string, value: string):Observable<Response>{
    return this._http.patch<Response>(this.url2 + 'listas/updatePublic/' + id + '/' + value, httpOptions);
  }
  playlistName(id: string, value: string):Observable<Response>{
    return this._http.patch<Response>(this.url2 + 'listas/updateTitle/' + id + '/' + value, httpOptions);
  }
  deleteSong(id: number):Observable<Response>{
    return this._http.patch<Response>(this.url + 'Canciones/deleteSong/' + id, httpOptions);
  }
  deleteAlbum(id: number):Observable<Response>{
    return this._http.patch<Response>(this.url + 'Canciones/deleteAlbum/' + id, httpOptions);
  }
  getAlbumsByUser(id: number):Observable<Response>{
    return this._http.get<Response>(this.url + 'Canciones/getAlbumsByUser/' + id);
  }
}
