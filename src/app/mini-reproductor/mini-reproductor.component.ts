import { Component } from '@angular/core';
import { SharedSongsService } from '../shared-songs.service';
import { NgFor, NgIf } from '@angular/common';
import { stats } from '../Models/stats';
import { ApiCancionesService } from '../services/api-canciones.service';
import { ApiAuthService } from '../services/api-auth.service';

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
  songImage: string = '';
  songAutor: string = ''

  constructor (private _share: SharedSongsService, private _apiService: ApiCancionesService, private _apiAuth: ApiAuthService){
    this._share.getSong.subscribe({
      next: x => {
        this.song = x;
        this.songImage = this.getSongImage(x);
        this.songAutor = this.getAutor(x);
        this.updateAudio();
      }
    });
  }
  toggleRepeat(): void {
    this.isRepeat = !this.isRepeat;
  }
  onAudioEnded(event: any): void {
    if (this.isRepeat) {
      const audioPlayer = event.target;
      audioPlayer.play();
      this.addStats();
      console.log(this.stats)
    }else{
      this.nextSong();
    }
    
  }
  updateAudio(): void {
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (audioPlayer) {
      audioPlayer.load();
      this.addStats();
      console.log(this.stats)

    }
  }
  nextSong(): void {
    this._share.nextSong();
  }

  previousSong(): void {
    this._share.previousSong();

  }
  addStats(){
  const ahora = new Date();
  this.fecha = ahora.toLocaleString(); // O cualquier formato que prefieras
  this.stats.idCancion = this.getSongId(this.song);
  this.stats.idUsuario = this._apiAuth.userData!.idUsuario;
  this.stats.fechaReproduccion = this.fecha;
  this._apiService.addStats(this.stats).subscribe(x => {
    if(x.success === true){
      console.log(x);
    }
  })
  }
  getSongImage(song: any): string {
    return song.portada || song.imagen || '';
  }
  getAutor(song: any): string {
    return song.autor || song.artista || '';
  }
  getSongId(song: any): number {
    return song.idCancion || song.id || 0;
  }
}
