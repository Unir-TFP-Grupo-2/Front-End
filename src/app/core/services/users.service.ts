import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { Router } from '@angular/router';

type RegisterBody = { name: string, lastname: string, email: string, password: string, role: string }
type LoginBody = { email: string, password: string };
type LoginResponse = { error?: string, massage?: string, token?: string }
type RecoverBody = { email: string }

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = `${environment.apiUrl}/usuarios`;

  private httpClient = inject(HttpClient)
  private router = inject(Router)

  /**
   * Registra un nuevo usuario.
   * 
   * @param {RegisterBody} newUser - El cuerpo de la solicitud que contiene los datos del nuevo usuario.
   * @returns {Promise<Iuser>} - Una promesa que se resuelve con los datos del usuario registrado.
   */
  async register(newUser: RegisterBody): Promise<IUser> {
    const token = localStorage.getItem('authToken'); // Asumiendo que el token se almacena en localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const user = await firstValueFrom(
        this.httpClient.post<IUser>(`${this.baseUrl}/registro`, newUser, { headers })
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
   * 
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
      
      this.router.navigate(['/home']); // Redirige a la página de inicio
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
 /*  recover(body: RecoverBody): Promise<> {
    return firstValueFrom(
      this.httpClient.post<>(`${this.baseUrl}/recover`, body)
    );
  } */


}


