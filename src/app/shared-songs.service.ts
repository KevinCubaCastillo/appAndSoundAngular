import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedSongsService {
  private _data : any;
  songPlay = new BehaviorSubject<any>(null);
  dataView = new BehaviorSubject<any>(null);
  songsQueue = new BehaviorSubject<any[]>([]);
  private currentSongIndex = new BehaviorSubject<number>(0);

  getSongQueue = this.currentSongIndex.asObservable();


  get datos(){
    return this._data;
  }
  get getSong(){
    return this.songPlay.asObservable();
    }
  get getData(){
    return this.dataView.asObservable();
  }
  agregarDato(data : any){
    this._data = data;
  }
  setSong(song : any){
   this.songPlay.next(song);
  } 
  setSongs(songs: any[]): void {
    this.songsQueue.next(songs);
    this.currentSongIndex.next(0); // Start with the first song
  }
  setData (data: any){
    this.dataView.next(data);
  }
  nextSong(): void {
    const currentIndex = this.currentSongIndex.value;
    const newIndex = (currentIndex + 1) % this.songsQueue.value.length;
    this.currentSongIndex.next(newIndex);
  }
  previousSong(): void {
    const currentIndex = this.currentSongIndex.value;
    const newIndex = (currentIndex - 1 + this.songsQueue.value.length) % this.songsQueue.value.length;
    this.currentSongIndex.next(newIndex);
  }
  getCurrentSong(): any {
    return this.songsQueue.value[this.currentSongIndex.value];
  }
  constructor() { }
}


