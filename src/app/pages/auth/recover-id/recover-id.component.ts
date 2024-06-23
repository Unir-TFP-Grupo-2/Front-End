import { Component, NgModule, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';
import { EmailService } from '../../../core/services/email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recover-id',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './recover-id.component.html',
  styleUrls: ['./recover-id.component.css']
})
export class RecoverIdComponent {

  formRecoverPass: FormGroup;
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  usersService = inject(UsersService);
  emailRecover = inject(EmailService);
  newpassword = '';
  newpasswordAct = '';
  errorMessage = '';

  

  constructor() {
    this.formRecoverPass = new FormGroup({
      newpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(3)]),
    },);
  }

  async onSubmit() {
    const userId = localStorage.getItem('user_id');
    this.newpassword = this.formRecoverPass.get('newpassword')?.value;
    this.newpasswordAct = this.formRecoverPass.get('newpasswordAct')?.value;

  

    try {
      if (!userId || !this.newpassword) {
        throw new Error('Faltan datos necesarios para actualizar la contraseña del usuario');
        console.log(userId)
      }

      // Datos a enviar en la petición para actualizar el usuario
      const userDetailsActualizado = { password: this.newpassword };

      // Asegúrate de que la URL es correcta y no tiene segmentos duplicados
      await this.usersService.updateUser(userId, userDetailsActualizado); // Usa el userId obtenido de localStorage
      await this.router.navigate(['/welcome']);
      console.log('Cambios guardados con éxito');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  }
}