import { Component } from '@angular/core';
import { NavigationCancel, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

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
}

