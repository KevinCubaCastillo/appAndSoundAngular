import { Component, OnInit } from '@angular/core';
import { ApiCancionesService } from '../services/api-canciones.service';

@Component({
  selector: 'app-explorar-novedades',
  standalone: true,
  imports: [],
  templateUrl: './explorar-novedades.component.html',
  styleUrl: './explorar-novedades.component.css'
})
export class ExplorarNovedadesComponent implements OnInit{
  public lst: any;
  constructor(private _apiService: ApiCancionesService){

  }
  ngOnInit(): void {
    this.getStats();
  }
  getStats(){
    this._apiService.getStats(this._apiService.userData.idUsuario).subscribe(x =>{
      if(x.success === true){
        this.lst = x.data;
        console.log(this.lst);
      }
    })
  }
}
