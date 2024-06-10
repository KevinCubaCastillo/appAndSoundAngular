import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedSongsService {
  private _data : any;
  private songQueue: any[] = [];
  private currentIndex: number = 0;

  songPlay = new BehaviorSubject<any>(null);
  dataView = new BehaviorSubject<any>(null);



  get datos() {
    return this._data;
  }

  get getSong() {
    return this.songPlay.asObservable();
  }

  get getData() {
    return this.dataView.asObservable();
  }

  agregarDato(data: any) {
    this._data = data;
  }

  setSong(song: any) {
    this.songQueue = [song];
    this.currentIndex = 0;
    this.songPlay.next(this.songQueue[this.currentIndex]);
  }

  setData(data: any) {
    this.dataView.next(data);
  }
  setSongQueue(queue: any[]) {
    this.songQueue = queue;
    if (queue.length > 0) {
      this.currentIndex = 0;
      this.songPlay.next(this.songQueue[this.currentIndex]);
    }
  }
  nextSong() {
    if (this.songQueue.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.songQueue.length;
      this.songPlay.next(this.songQueue[this.currentIndex]);
    }
  }

  previousSong() {
    if (this.songQueue.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.songQueue.length) % this.songQueue.length;
      this.songPlay.next(this.songQueue[this.currentIndex]);
    }
  }
  constructor() { }
}


