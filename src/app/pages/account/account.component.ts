import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  username = '';
  name = '';
  lastname = '';
  email = '';
  fechaNacimiento = '';
  password = '';
  passwordVisible = false;
  phone = '';
  photo: string | undefined;
  usuarios: any[] = [];
  activatedRouter = inject(ActivatedRoute);

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
    this.baseUrl = ''; // Inicializar con un valor por defecto o configurar adecuadamente
    this.httpClient = http; // Asegurarse de que httpClient esté correctamente inicializado
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
        console.log(this.usuarios);
        this.Username = response.name;
        this.name = response.name;
        this.lastname = response.lastname;
        this.email = response.email;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    }
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
      'Authorization': 'Bearer ' + localStorage.getItem('token_usuario')
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
      'Authorization': 'Bearer ' + localStorage.getItem('token_usuario')
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


