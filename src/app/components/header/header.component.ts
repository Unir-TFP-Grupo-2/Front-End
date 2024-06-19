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
  id = 0;

  constructor() {
    this.id = localStorage['id_user'];
  }
  async ngOnInit(): Promise<void> {
    this.id = localStorage['id_user'];

    // Asegurarse de que el DOM esté completamente cargado
    const click = document.querySelector(".nav-li_a");
    if (click) {
      click.addEventListener('click', function () {
        const nav = document.querySelector(".nav");
        const menu_flotante = document.querySelector(".menu-flotante");
        if (menu_flotante && nav) {
          menu_flotante.classList.remove("hidden");
          nav.classList.remove("open");
        }
      });
    } else {
      console.log("Elemento .nav a no encontrado");
    }

  }

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

