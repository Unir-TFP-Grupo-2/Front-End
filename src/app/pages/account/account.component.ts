import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  Username = 'PEDRO';
  name = 'PEDRO';
  lastname = 'FERNÁNDEZ';
  email = 'PEDRO@GMAIL.COM';
  photo = 'https://i.pravatar.cc/500?u=mariadelcarmen.herreravillanueva@peticiones.online';
  fechaNacimiento = '22/02/1990';
  password = '2564564';
  passwordVisible = false;
  Phone = '652874555';
  
}


