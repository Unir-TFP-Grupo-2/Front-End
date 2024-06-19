import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService,  } from '../../../core/services/users.service';

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
  activatedRoute = inject(ActivatedRoute)
  

  constructor() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      
      // password: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(3),
      // ]),
  }, [])
}


  async onSubmit(){
  try {
    
      const response = await this.usersService.login(this.formLogin.value)
      console.log(response)
      localStorage.setItem('token_usuario', response.token!)
      localStorage.setItem('user_id', response.user!);
      this.router.navigateByUrl('/home');
  } catch (err: any) {
    console.log(err.error.error);   
    }
  }
}


