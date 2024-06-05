import { Component } from '@angular/core';
import { SharedSongsService } from '../shared-songs.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-mini-reproductor',
  standalone: true,
  imports: [NgIf],
  templateUrl: './mini-reproductor.component.html',
  styleUrl: './mini-reproductor.component.css'
})
export class MiniReproductorComponent {
  song: any;
  portada: string = '';
  nombre: string = '';
  url: string = '';
  autor: string = '';
  album: string = '';
  constructor (private _share: SharedSongsService){
    this._share.getSong.subscribe({
      next: x =>{
        this.song = x;
        this.updateAudio();
      }
    })
    
  }
  updateAudio(): void {
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    audioPlayer.load();
  }

}
