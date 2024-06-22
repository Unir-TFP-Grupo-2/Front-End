import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formRegister: FormGroup;
  router = inject(Router)
  formBuilder = inject(FormBuilder) 
  usersService = inject(UsersService)
  activatedRoute = inject(ActivatedRoute)

  // constructor() {
  //   this.formRegister = this.formBuilder.group({
  //     name: null,
  //     lastname: null,
  //     email: null,
  //     password: null,
  //   })
  // }

  
  constructor() {
    this.formRegister = new FormGroup({
      name: new FormControl('', [

      ]),
      lastname: new FormControl('', [

      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
  }, [])
}



async onSubmit() {
  const response = await this.usersService.register(this.formRegister.value);
  if (response._id !== null) {
    Swal.fire({
      title: 'Te has registrado correctamente',
      icon: 'success',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: 'var(--primary)',
    }).then(() => {
      this.router.navigate(['/login']);
    });
  } else {
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema, intentalo de nuevo',
      icon: 'error',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: 'var(--primary)',
    });
  }
}
}


