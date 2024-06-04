import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formRegister: FormGroup;

  formBuilder = inject(FormBuilder) 
  usersService = inject(UsersService)

  constructor() {
    this.formRegister = this.formBuilder.group({
      id: null,
      name: null,
      lastname: null,
      photo: null,
      email: null,
      password: null,
    })
  }

  async onSubmit(){
    const response = await this.usersService.register(this.formRegister.value)
    console.log(response)
  }
}
