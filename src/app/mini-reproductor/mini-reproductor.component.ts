import { Component } from '@angular/core';
import { SharedSongsService } from '../shared-songs.service';
import { NgFor, NgIf } from '@angular/common';
import { stats } from '../Models/stats';
import { ApiCancionesService } from '../services/api-canciones.service';

@Component({
  selector: 'app-mini-reproductor',
  standalone: true,
  imports: [NgIf],
  templateUrl: './mini-reproductor.component.html',
  styleUrl: './mini-reproductor.component.css'
})
export class MiniReproductorComponent {
  song: any;
  songQueue: any;
  fecha : string = '';
  stats : stats = {fechaReproduccion: this.fecha, idCancion: 0, idUsuario: 0}
  portada: string = '';
  nombre: string = '';
  url: string = '';
  autor: string = '';
  album: string = '';
  isRepeat: boolean = false;

  constructor (private _share: SharedSongsService, private _apiService: ApiCancionesService){
    this._share.getSong.subscribe({
      next: x =>{
        this.song = x;
        this.updateAudio();
      }
    })
    /*this._share.getSongQueue.subscribe({
      next: index => {
        this.songQueue = this._share.getCurrentSong();
        this.updateAudio();
      }
    });*/
  }
  toggleRepeat(): void {
    this.isRepeat = !this.isRepeat;
  }
  onAudioEnded(event: any): void {
    if (this.isRepeat) {
      const audioPlayer = event.target;
      audioPlayer.play();
      this.addStats();
    }
  }
  updateAudio(): void {
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (audioPlayer) {
      audioPlayer.load();
    }
  }
  addStats(){
  const ahora = new Date();
  this.fecha = ahora.toLocaleString(); // O cualquier formato que prefieras
  this.stats.idCancion = this.song.idCancion;
  this.stats.idUsuario = this._apiService.userData.idUsuario;
  this.stats.fechaReproduccion = this.fecha;
  this._apiService.addStats(this.stats).subscribe(x => {
    if(x.success === true){
      console.log(x);
    }
  })
  }

  nextSong(): void {
    this._share.nextSong();
  }

  previousSong(): void {
    this._share.previousSong();
  }
/*
<div class="mini-player todo">
  <h5>Escuchando ahora...</h5>
  <div *ngIf="song" class="song-info d-flex align-items-center">
    <img src="{{song.portada}}" alt="Portada" class="song-image mr-3" style="max-width: 120px;">
    <div>
      <p>{{ song.nombre }}</p>
      <p>{{ song.album }}</p>
      <p>{{ song.autor }}</p>
    </div>
  </div>
  <p *ngIf="!song">No hay canción seleccionada</p>
  <audio id="audioPlayer" autoplay controls class="mb-4" style="width: 100%;" *ngIf="song">
    <source [src]="song.url" type="audio/mp3">
    <p *ngIf="!song.url">Tu dispositivo no soporta este formato</p>
  </audio>
</div>*/
}
