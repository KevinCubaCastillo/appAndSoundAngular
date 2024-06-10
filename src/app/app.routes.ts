import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {InicioComponent} from './inicio/inicio.component';
import {ExplorarNovedadesComponent} from './explorar-novedades/explorar-novedades.component';
import {BibliotecaCancionesComponent} from './biblioteca-canciones/biblioteca-canciones.component';
import {CrearPlaylistComponent} from './crear-playlist/crear-playlist.component';
import {ReproductorComponent} from './reproductor/reproductor.component';
import {PerfilComponent} from './perfil/perfil.component';
import {PerfilAdminComponent} from './perfil-admin/perfil-admin.component';
import { AlbumchargeComponent } from './albumcharge/albumcharge.component';
import { AuthGuard } from './Security/auth.guard';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { ViewComponent } from './view/view.component';
import { AlbumViewComponent } from './album-view/album-view.component';
export const routes: Routes = [
{path: '', redirectTo: 'Inicio-list', pathMatch:'full'},
{path: 'Inicio-list', component: InicioComponent, canActivate: [AuthGuard]},
{path: 'Login-list', component: LoginComponent},
{path: 'Biblioteca-list', component: BibliotecaCancionesComponent, canActivate: [AuthGuard]},
{path: 'playlist-list', component: CrearPlaylistComponent, canActivate: [AuthGuard]},
{path: 'reproductor-list', component: ReproductorComponent, canActivate: [AuthGuard]},
{path: 'perfil-list', component: PerfilComponent, canActivate: [AuthGuard]},
{path: 'perfil-admin-list', component: PerfilAdminComponent, canActivate: [AuthGuard]},
{path: 'explorar-novedades-list', component: ExplorarNovedadesComponent, canActivate: [AuthGuard]},
{path: 'subir-contenido', component:AlbumchargeComponent, canActivate: [AuthGuard]},
{path: 'editar-perfil', component:EditarPerfilComponent, canActivate: [AuthGuard]},
{path: 'view', component:ViewComponent, canActivate: [AuthGuard]},
{path: 'album-view', component:AlbumViewComponent, canActivate: [AuthGuard]}
]

