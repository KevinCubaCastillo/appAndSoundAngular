import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { userLogin } from '../Models/userLogin';
import { usuario } from '../Models/usuario';
import { Response } from '../Models/Response';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  url: string = 'https://www.andsoundapi.somee.com/api/'
  private _usuarioSubject! : BehaviorSubject<userLogin | null>;
  public usuarioObs!: Observable<userLogin | null>;
  public get userData(): userLogin | null{
    return this._usuarioSubject.value;
  }
  constructor(
    private _http: HttpClient
  ) { 
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('userLog');
      this._usuarioSubject = new BehaviorSubject<userLogin | null>(storedUser ? JSON.parse(storedUser) : null);
      this.usuarioObs = this._usuarioSubject.asObservable();
    } else {
     console.error('El objeto localStorage no está disponible en este contexto.');
    }
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
