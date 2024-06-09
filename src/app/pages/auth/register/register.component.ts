import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
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
  router = inject(Router)
  formBuilder = inject(FormBuilder) 
  usersService = inject(UsersService)
  activatedRoute = inject(ActivatedRoute)

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

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params:any) => {
     if(params.id) {
       const response = await this.usersService.getById(params.id)
       console.log(response)
       this.formRegister = new FormGroup({
        name: new FormControl('', [
          Validators.required
        ]),
        last_name: new FormControl('', [
          Validators.required
        ]),
       email: new FormControl(response.email, [
           Validators.required,
           Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
          ]),
         password: new FormControl(response.password, [
          Validators.required
        ])
       }, [])
       }
    })
  }


  async onSubmit(){
    const response = await this.usersService.register(this.formRegister.value)
    if(response.id) {
      alert(`El Usuario ${response.name} se ha añadido correctamente`)
      this.router.navigate(['/login'])
    }else {
      alert('Hubo un problema, intentalo de nuevo')
    }
  }
  }


