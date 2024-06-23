import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formRegister: FormGroup;
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.formRegister = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
    });
  }


  async onSubmit() {
    if (this.formRegister.valid) {
      const response = await this.usersService.register(this.formRegister.value);
      if (response._id !== null) {
        alert(`El Usuario ${response.name} se ha añadido correctamente`);
        this.router.navigate(['/login']);
      } else {
        alert('Hubo un problema, intentalo de nuevo');
      }
    } else {
      this.formRegister.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los mensajes de error
    }
  }
}






