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
  
    try {
      if (!userId || !this.newpassword) {
        throw new Error('Faltan datos necesarios para actualizar la contraseña del usuario');
      }
  
      // Llama a la función para actualizar solo la contraseña
      await this.usersService.updateUserPassword(userId, this.newpassword);
      await this.router.navigate(['/welcome']);
      console.log('Cambios guardados con éxito');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  }
}