import { Component, NgModule, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { RouterModule, Router, RouterLink, ActivatedRoute } from '@angular/router';
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
  token: string | null = null;
  userId: string | null = null;

  router = inject(Router);
  formBuilder = inject(FormBuilder);
  usersService = inject(UsersService);
  emailRecover = inject(EmailService);
  newpassword = '';
  errorMessage = '';
  route = inject(ActivatedRoute);
  

  constructor() {
    this.formRecoverPass = new FormGroup({
      newpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(3)]),
    },);
  }

  async ngOnInit(): Promise<void> {
    this.token = this.route.snapshot.queryParams['token'];
    this.userId = this.route.snapshot.queryParams['id'];
    console.log(this.userId)
}

  async onSubmit() {
  
    this.newpassword = this.formRecoverPass.get('newpassword')?.value;
    console.log(this.userId)
    console.log(this.newpassword)
  
    try {
      if (!this.userId || !this.newpassword) {
        throw new Error('Faltan datos necesarios para actualizar la contraseña del usuario');
      }
  
      // Llama a la función para actualizar solo la contraseña
      //
      await this.usersService.updateUserPassword(this.userId, this.newpassword, this.token);
      await this.router.navigate(['/welcome']);
      console.log('Cambios guardados con éxito');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  }
}