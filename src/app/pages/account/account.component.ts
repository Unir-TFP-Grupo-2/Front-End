import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  name = '';
  lastname = '';
  email = '';
  password = '';
  newPasswordVisible = false;
  passwordVisible = false;
  photo: string | undefined;
  usuarios: any[] = [];

  
  activatedRouter = inject(ActivatedRoute);
  baseUrl: string;
  httpClient: HttpClient;
  cambiarpassword: any;
  passwordActual: any;


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
    console.log(localStorage.getItem('token_usuario'));
    const userId = localStorage.getItem('user_id');
    this.http.get(`http://localhost:3000/api/usuarios/${userId}`, { headers }).subscribe({


      next: (response: any) => {
        this.usuarios = response;
        console.log(this.usuarios);
        this.name = response.name;
        this.lastname = response.lastname;
        this.email = response.email;
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
  
    async guardarCambios() {
      try {
        const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        if (!id) {
          console.error('El ID es nulo');
          await this.router.navigate(['/home']);
          return;
        }
    
        const token = localStorage.getItem('token_usuario');
        if (!token) {
          console.error('No se encontró el token de autenticación');
          return;
        }
    
        const userDetails: any = {
          name: this.name,
          lastname: this.lastname,
          email: this.email,
          photo: this.photo,
        };
    
        if (this.cambiarpassword && this.passwordActual) {
          userDetails.password = this.passwordActual;
        }
    
        await this.updateUser(id);
        console.log('Cambios guardados con éxito');
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      }
    }
  updateUser(id: number) {
    throw new Error('Method not implemented.');
  }
  
    async cambiarPassword(nuevaContraseña: string) {
      const token = localStorage.getItem('token_usuario');
      if (!token) {
        console.error('No se encontró el token de autenticación.');
        return;
      }
    
      const passwordDetails = {
        password: nuevaContraseña,
      };
    
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
    
      try {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        await this.http.put(`https://mi-api.com/api/usuarios/${id}/cambiarPassword`, passwordDetails, httpOptions);
        console.log('Contraseña actualizada con éxito');
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
      }
  }
}
