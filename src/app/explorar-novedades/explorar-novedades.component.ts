import { Component, OnInit } from '@angular/core';
import { ApiCancionesService } from '../services/api-canciones.service';
import { NgFor } from '@angular/common';
import { ApiAuthService } from '../services/api-auth.service';

@Component({
  selector: 'app-explorar-novedades',
  standalone: true,
  imports: [NgFor],
  templateUrl: './explorar-novedades.component.html',
  styleUrl: './explorar-novedades.component.css'
})
export class ExplorarNovedadesComponent implements OnInit{
  public lst: any;
  public lst2: any;
  constructor(private _apiService: ApiCancionesService, private _apiAuth: ApiAuthService){

  }
  ngOnInit(): void {
    this.getStats();
    this.getStory();
  }
   resultsLimit = 10;

  setResultsLimit(limit: number) {
    this.resultsLimit = limit;
  }
  getStory(){
    this._apiService.getStatsStory(this._apiAuth.userData!.idUsuario).subscribe(x =>{
      if(x.success === true){
        this.lst2 = x.data;
        console.log(this.lst2);
      }
    })
  }
  getStats(){
    this._apiService.getStats(this._apiAuth.userData!.idUsuario).subscribe(x =>{
      if(x.success === true){
        this.lst = x.data;
        console.log(this.lst);
      }
    })
  }
}
