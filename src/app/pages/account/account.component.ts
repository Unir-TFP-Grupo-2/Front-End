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
  id: string | null = null;

  
  activatedRouter = inject(ActivatedRoute);
  baseUrl: string;
  httpClient: HttpClient;
  cambiarpassword: any;
  nuevaPassword: any;
  newPassword: any;
  userId: any;
  


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
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.params.subscribe(async (params: any) => {
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
        this.photo = response.photo;
        this.password = response.password;//.bcrypt.hashSync(this.password, 8);
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
      // Asegúrate de que userId está definido y es el correcto
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.error('El ID del usuario no está definido');
        return;
      }

      this.name = '';
      this.lastname = '';
      this.email = '';
      this.photo = '';
      this.password = '';

      const userDetailsActualizado: any = {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        photo: this.photo,
        password: this.password
      };
    
      if (this.cambiarpassword && this.newPassword) {
        userDetailsActualizado.password = this.newPassword;
      }
    
      try {
        // Asegúrate de que la URL es correcta y no tiene segmentos duplicados
        await this.usersService.updateUser(userId, userDetailsActualizado); // Usa el userId obtenido de localStorage
        await this.router.navigate([`/account`]);
        console.log('Cambios guardados con éxito');
      } catch (error) {
        // Mejora el manejo de errores para proporcionar retroalimentación más específica
        console.error('Error al guardar los cambios:', error);
        // Aquí puedes agregar lógica adicional para manejar diferentes tipos de errores, por ejemplo:
        // if (error.status === 404) {
        //   console.error('Usuario no encontrado');
        // } else if (error.status === 500) {
        //   console.error('Error del servidor');
        // }
      }
    }
    }
