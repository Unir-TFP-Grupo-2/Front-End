import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  activatedRoute = inject(ActivatedRoute)
  

  constructor() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
  }, [])
}

 ngOnInit() {
  this.activatedRoute.params.subscribe(async (params:any) => {
   if(params.id) {
     const response = await this.usersService.getById(params.id)
     console.log(response)
     this.formLogin = new FormGroup({
     email: new FormControl(response.email, [
         Validators.required
        ]),
       password: new FormControl(response.password, [
        Validators.required
      ])
     }, [])
     }
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


