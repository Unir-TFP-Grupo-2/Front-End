import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {
  name = '';  
  email = '';
  message = '';

  constructor(private http: HttpClient) {}

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  validateName(name: string): boolean {
    return name.length > 2;
  }

onSubmit() {

  if (!this.validateEmail(this.email)) {
    alert('Por favor, introduce un email válido.');
    return;
  }

  if (!this.validateName(this.name)) {
    alert('Por favor, introduce un nombre válido.');
    return;
  }

    const emailData = {
      to: this.email, // Ahora dinámico, usando el email proporcionado por el usuario
      subject: "Asunto del correo",
      text: `Nombre: ${this.name}\nEmail: ${this.email}\nMensaje: ${this.message}`
    };

    // Crear headers incluyendo el token de autenticación
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NTc2Mjg4NH0.m5f5C4hsDFo5xgnIS6umTzXz3IAYjtwa6G0PL5U7kO4` 
    });

    this.http.post('http://localhost:3000/api/email/send', emailData, { headers: headers })
    .subscribe({
      next: (response) => alert('Mensaje enviado correctamente'),
      error: (error) => alert('Error al enviar el mensaje')
    });
  }
}