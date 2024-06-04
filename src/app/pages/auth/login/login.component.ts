import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
      
  formLogin: FormGroup;

  formBuilder = inject(FormBuilder) 
  usersService = inject(UsersService)
  router = inject(Router)
  

  constructor() {
    this.formLogin = this.formBuilder.group({
      email: null,
      password: null,
    })
  }

  async onSubmit(){
  try {
      const response = await this.usersService.login(this.formLogin.value)
      localStorage.setItem('token_usuario', response.token!)
      
      this.router.navigateByUrl('/home');
  } catch (err) {
    console.log(err);   
    }
  }
}


