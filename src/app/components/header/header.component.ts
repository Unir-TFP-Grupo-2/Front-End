import { Component, inject } from '@angular/core';
import { NavigationCancel, RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authService = inject(UsersService)

  addClassOpen() {
    const nav = document.querySelector(".nav");
    const menu_flotante = document.querySelector(".menu-flotante");
    nav?.classList.add("open");
    menu_flotante?.classList.add("hidden");
  }

  removeClassOpen() {
    const nav = document.querySelector(".nav");
    const menu_flotante = document.querySelector(".menu-flotante");

    menu_flotante?.classList.remove("hidden");
    nav?.classList.remove("open");
  }

  

  logout(): void {
    const confirmLogout = confirm("¿Realmente quieres salir?");
    if (confirmLogout) {
      this.authService.logout();
    }
  }
}

