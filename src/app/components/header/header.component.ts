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
    console.log(nav);
    nav?.classList.add("open");
  }
}

