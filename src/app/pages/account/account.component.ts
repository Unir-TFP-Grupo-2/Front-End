import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  Username = '';
  name = '';
  lastname = '';
  email = '';
  fechaNacimiento = '';
  password = '';
  passwordVisible = false;
  Phone = '';
  photo: string | undefined;
  usuarios: any[] = [];
  activatedRouter = inject(ActivatedRoute);


  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.passwordActual = 'contraseñaActual';
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(async (params: any) => {
      this.obtenerUsuarios(params.id);
    }
    );
    console.log(localStorage.getItem('token_usuario'));

  }

  obtenerUsuarios(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token_usuario')
    });

    this.http.get('http://localhost:3000/api/usuarios/' + id, { headers }).subscribe({


      next: (response: any) => {
        this.usuarios = response;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    });
  }

  cambiarFoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photo = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  guardarCambios() {
    const userDetails = {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      photo: this.photo,
      password: this.password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJwZWRyb0BnbWFpbC5jb20iLCJpYXQiOjE3MTg1NDk4MDIsImV4cCI6MTcxODYzNjIw'
    });

    this.http.put('https://mi-api.com/api/usuarios/1', userDetails, { headers })
      .subscribe({
        next: (response) => {
          console.log('Cambios guardados:', response);
        },
        error: (error) => {
          console.error('Error al guardar los cambios:', error);
        }
      });
  }


  cambiarpassword = false;
  passwordActual: string;

  cambiarPassword(nuevaContraseña: string) {
    const passwordDetails = {
      password: nuevaContraseña
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NTc2Mjg4NH0.m5f5C4hsDFo5xgnIS6umTzXz3IAYjtwa6G0PL5U7kO4'
    });

    this.http.put('https://mi-api.com/usuarios/123/password', passwordDetails, { headers })
      .subscribe({
        next: (response) => {
          console.log('Contraseña actualizada:', response);
        },
        error: (error) => {
          console.error('Error al actualizar la contraseña:', error);
        }
      });
  }
}



