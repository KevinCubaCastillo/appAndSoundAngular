import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { MiniReproductorComponent } from "./mini-reproductor/mini-reproductor.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { userLogin } from './Models/userLogin';
import { ApiCancionesService } from './services/api-canciones.service';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HeaderComponent, DashboardComponent, FooterComponent, MiniReproductorComponent, HttpClientModule, ReactiveFormsModule]
})
export class AppComponent {
  title = 'Spoty_app';
  user: any;

}
