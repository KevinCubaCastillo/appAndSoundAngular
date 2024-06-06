import { Component, OnInit, inject } from '@angular/core';
import { ApiCancionesService } from '../services/api-canciones.service';
import { Observable } from 'rxjs';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { perfil } from '../Models/perfil';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit{
  uploadCompleted: boolean = false;
  downloadURL$!: Observable<string>;
  private _storage : Storage = inject(Storage);
  public idProfile: number = 0;
  public username: string = '';
  public profilePic: string = '';
  public newPic: string = '';
  public profile: perfil;
  defaultProfilePic: string = 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='; // Cambia esto a la ruta de tu imagen por defecto

constructor(
  private _apiService: ApiCancionesService
){
  this.profile = {nombrePerfil: this.username, fotoPerfil: this.profilePic}
}
onCoverSelected(event : any){
  const coverSelected : File = event.target.files[0];
  this.uploadCover(coverSelected);
  console.log(coverSelected);
}
async uploadCover (file: File){
  const filePath = `content/profile_pictures/${file.name}`;
  const fileRef = ref (this._storage, filePath);
  const uploadFile = uploadBytesResumable(fileRef, file);
  uploadFile.on('state_changed',
  (Snapshot) =>{
    const progress = (Snapshot.bytesTransferred / Snapshot.totalBytes) * 100;
    if (progress === 100) {
      this.uploadCompleted = true; // Habilitar el botón cuando el progreso alcanza el 100%
    }

  },
  (error) => {
    console.error(error);
  },
  async () =>{
    alert('Se subio la foto de perfil');
    this.newPic = await getDownloadURL(fileRef);
    console.log(this.newPic);
  }
  )
}
ngOnInit(): void {
  //this.username = this._apiService.userData.nombrePerfil;
  //this.profilePic = this._apiService.userData.fotoPerfil;
  this.idProfile = this._apiService.userData.idPerfil;
  this.getProfile();
}
getProfile(){
  this._apiService.getProfileById(this._apiService.userData.idPerfil).subscribe(x =>{
    this.username = x.data[0].nombrePerfil;
    this.profilePic = x.data[0].fotoPerfil;
  })
}
updateProfile(){
  this.profile.nombrePerfil = this.username;
  this.profile.fotoPerfil = this.newPic
  this._apiService.updateProfile(this.idProfile, this.profile).subscribe(x =>{
    if(x.success === true){
      alert(x.message)
      console.log(x)
      this.getProfile();
    }
  })
}
uptadeUsername(){
  console.log('Click');
  this.profile.nombrePerfil = this.username;
  this.profile.fotoPerfil = this.profilePic;
  this._apiService.updateProfile(this.idProfile, this.profile).subscribe(x => {
    if(x.success === true){
      alert(x.message);
      this.getProfile();
    }
  })
}
}
