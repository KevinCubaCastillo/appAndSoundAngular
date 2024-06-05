import { Component, OnInit } from '@angular/core';
import { SharedSongsService } from '../shared-songs.service';

@Component({
  selector: 'app-reproductor',
  standalone: true,
  imports: [],
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.css'
})
export class ReproductorComponent implements OnInit{
  song: any;
  portada: string = '';
  nombre: string = '';
  url: string = '';
  autor: string = '';
  album: string = '';


  constructor (private _share: SharedSongsService){}
  ngOnInit(): void {
      this.song = this._share.datos;
      this.portada = this.song.portada;
      this.nombre = this.song.nombre;
      this.autor = this.song.autor;
      this.url = this.song.url;
      this.album = this.song.album;
  }
}
