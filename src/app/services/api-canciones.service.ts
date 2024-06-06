import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Response } from '../Models/Response';
import { usuario } from '../Models/usuario';
import { album } from '../Models/album';
import { userLogin } from '../Models/userLogin';
import { perfil } from '../Models/perfil';
import { playlist } from '../Models/playlist';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiCancionesService {
  url: string = 'https://www.andsoundapi.somee.com/api/'
  //url2: string = 'https://api-playlists.onrender.com/api/'
  url2: string = 'https://7jrdevxgdk.execute-api.us-east-1.amazonaws.com/Deployment/api/'
  private _usuarioSubject = new BehaviorSubject<any>(null);
  public usuarioObs!: Observable<userLogin>;
  public get userData(): userLogin{
    return this._usuarioSubject.value[0];
  }

  constructor(
    private _http: HttpClient
  ) { 
    if (typeof localStorage !== 'undefined') {
      this._usuarioSubject = new BehaviorSubject<userLogin>(JSON.parse(localStorage.getItem('userLog') || '{}'));
      this.usuarioObs = this._usuarioSubject.asObservable();
    } else {
      console.error('El objeto localStorage no está disponible en este contexto.');
    }
  }
  getCanciones():Observable<Response>{
    return this._http.get<Response>(this.url + 'Canciones/getAllsongs');
  }
  getAlbums():Observable<Response>{
    return this._http.get<Response>(this.url + 'Canciones/getAllAlbums')
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
  addPlaylist(pl : playlist):Observable<Response>{
    return this._http.post<Response>(this.url2 + 'listas/addListWithSong', pl, httpOptions);
  }
  disablePlaylist(id: string):Observable<Response>{
    return this._http.patch<Response>(this.url2 + 'listas/deactivatePlaylist/' + id, httpOptions);
  }
  deletePlaylist(id: string):Observable<Response>{
    return this._http.delete<Response>(this.url2 + 'listas/deletePlaylist/' + id);
  }
  login(user: usuario):Observable<Response>{
    return this._http.post<Response>(this.url + 'login/login', user, httpOptions).pipe(
      map(i =>{
        if(i.success === true){
          const user : userLogin = i.data;
          localStorage.setItem('userLog', JSON.stringify(user));
          this._usuarioSubject.next(user);
        }
        return i;
      })
    );
  }
  logout(){
    localStorage.removeItem('userLog');
    this._usuarioSubject.next(null);
  }
}
