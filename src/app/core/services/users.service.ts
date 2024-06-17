import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { Router } from '@angular/router';


type RegisterBody = { name: string, lastname: string, email: string, password: string}
type LoginBody = { email: string, password: string };
type LoginResponse = { error?: string, massage?: string, token?: string, user?: string }
type RecoverBody = { email: string }
type account = {name: string, lastname: string, email: string, password: string, phone: string, photo: string, fechaNacimiento: string}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = `${environment.apiUrl}/usuarios`;
  private httpClient = inject(HttpClient)
  private router = inject(Router)
  private userService: any;
 
  
  async fetchUserAccount() {
    try {
      const user: any = await this.userService.account();
      console.log('Datos del usuario:', user);
    } catch (error) {
      console.error('Error al obtener la cuenta del usuario:', error);
    }
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token_usuario');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  /**
   * Registra un nuevo usuario.
   * 
   * @param {RegisterBody} newUser - El cuerpo de la solicitud que contiene los datos del nuevo usuario.
   * @returns {Promise<IUser>} - Una promesa que se resuelve con los datos del usuario registrado.
   */
  async register(newUser: RegisterBody){
    const token = localStorage.getItem('authToken'); // Asumiendo que el token se almacena en localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const user = await firstValueFrom(
        this.httpClient.post<IUser>(`${this.baseUrl}/register`, newUser, /* { headers } */)
      );
      this.router.navigate(['/login']); // Redirige a la página de inicio
      return user;
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw error;
    }
    
  }


  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param {LoginBody} body - El cuerpo de la solicitud que contiene el correo electrónico y la contraseña.
   * @returns {Promise<LoginResponse>} - Una promesa que se resuelve con la respuesta de inicio de sesión.
   */
  async login(body: LoginBody): Promise<LoginResponse> {
    const token = localStorage.getItem('authToken'); // Asumiendo que el token se almacena en localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const user = await firstValueFrom(
        this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, body, { headers })
      );
      this.router.navigate(['/login']); // Redirige a la página de inicio
      return user;
    } catch (error) {
      console.error('Error durante el login:', error);
      throw error;
    }
  }

  
  /**
   * Recupera la cuenta mediante el correo electrónico proporcionado.
   * 
   * @param {RecoverBody} body - El cuerpo de la solicitud que contiene el correo electrónico.
   * @returns {Promise<v>} - Una promesa que se resuelve cuando la solicitud de recuperación se completa.
   */
  recover(body: RecoverBody): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<RecoverBody>(`${this.baseUrl}/recover`, body)
    );
  } 

  logout(): void {
    localStorage.removeItem('token_usuario');
  }


  getAll(): Promise<IUser> {
    return firstValueFrom(
      this.httpClient.get<IUser>(this.baseUrl, { headers: this.createHeaders() })
    );
  }

  getEmail(email: string): Promise<{ email: string }> {
    return firstValueFrom(this.httpClient.get<{ email: string }>(`${this.baseUrl}/email/${email}`));
  }
    
  

  
 /**
   * Obtiene la información de la cuenta del usuario actual.
   * @returns {Promise<IUser>} - Una promesa que se resuelve con los datos del usuario.
   */
 async account(): Promise<IUser> {
  const token = localStorage.getItem('authToken'); // Asumiendo que el token se almacena en localStorage
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  try {
    return await firstValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/account`, { headers }));
  } catch (error: any) {
    console.error('Error al obtener la información de la cuenta:', error);
    throw error; // O manejar el error de manera más específica
  }
}
}


