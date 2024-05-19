import { Component } from '@angular/core';
import { MiniGroupComponent } from '../../components/mini-group/mini-group.component';
import { NewUserComponent } from '../../components/new-user/new-user.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MiniGroupComponent, NewUserComponent, CommonModule],
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
