import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  Username = 'PEDRO';
  name = 'PEDRO';
  lastname = 'FERNÁNDEZ';
  email = 'PEDRO@GMAIL.COM';
  fechaNacimiento = '22/02/1990';
  password = '2564564';
  passwordVisible = false;
  Phone = '652874555';
  photo: string | undefined;



cambiarFoto(event: any) {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photo = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}

private http: HttpClient;

constructor(http: HttpClient) {
  this.http = http;
  this.passwordActual = 'contraseñaActual';
}

guardarCambios() {

  const userDetails = {
    Username: this.Username,
    name: this.name,
    lastname: this.lastname,
    Phone: this.Phone,
    email: this.email
  };

  this.http.put('', userDetails)
  .subscribe(response => {
    console.log('Cambios guardados:', response);
  }, error => {
    console.error('Error al guardar los cambios:', error);
  });
}

cambiarpassword = false;
passwordActual: string;

cambiarPassword(nuevaContraseña: string) {
  const passwordDetails = {
    password: nuevaContraseña
  };

  this.http.put('https://mi-api.com/usuarios/123/password', passwordDetails)
    .subscribe(response => {
      console.log('Contraseña actualizada:', response);
    }, error => {
      console.error('Error al actualizar la contraseña:', error);
    });
}
}



