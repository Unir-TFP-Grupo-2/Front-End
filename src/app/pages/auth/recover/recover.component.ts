import { Component, inject,} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';


@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.css'
})
export class RecoverComponent {

  formRecover: FormGroup;

  formBuilder = inject(FormBuilder)
  usersService = inject(UsersService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  constructor() {
      this.formRecover = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.email
      ]),

    })
  }

  async onSubmit(){
    try {
        alert(`Si el correo esta registrado en nuestra base de datos se te mandara un Gmail para restablecer la contraseña`);
        const response = await this.usersService.recover(this.formRecover.value)
        console.log(response)
                
        this.router.navigateByUrl('/home');
        
    } catch (err: any) {
      console.log(err.error.error);   
      }
    }
 
}
