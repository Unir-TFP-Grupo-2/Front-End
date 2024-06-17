import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NewFriendComponent } from './components/new-friend/new-friend.component';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, NewFriendComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  friends = ['Amigo 1', 'Amigo 2', 'Amigo 3', 'Amigo 4', 'Amigo 5']


  mostrarPopup = false;

  abrirPopup() {
    this.mostrarPopup = true;
}

  cerrarPopup() {
    this.mostrarPopup = false;
  }
}
