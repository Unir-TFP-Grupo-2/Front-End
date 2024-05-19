import { Component } from '@angular/core';
import { MiniGroupComponent } from '../../components/mini-group/mini-group.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MiniGroupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  mostrarPopup = false;

  abrirPopup() {
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }
}
