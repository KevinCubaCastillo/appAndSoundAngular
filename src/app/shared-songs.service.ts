import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedSongsService {
  private _data : any;
  songPlay = new BehaviorSubject<any>(null);

  get datos(){
    return this._data;
  }
  get getSong(){
    return this.songPlay.asObservable();
    }
  agregarDato(data : any){
    this._data = data;
  }
  setSong(song : any){
   this.songPlay.next(song);
  } 
  constructor() { }
}


