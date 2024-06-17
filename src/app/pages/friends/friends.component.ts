import { CommonModule } from '@angular/common';
<<<<<<< Updated upstream
import { Component } from '@angular/core';
import { NewFriendComponent } from './components/new-friend/new-friend.component';
=======
import { Component, inject } from '@angular/core';
import { NewFriendComponent } from './components/new-friend/new-friend.component';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { friendsService } from '../../core/services/friends.service';
import { IUser } from '../../core/interfaces/iuser';
>>>>>>> Stashed changes

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, NewFriendComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
<<<<<<< Updated upstream
  friends = ['Amigo 1', 'Amigo 2', 'Amigo 3', 'Amigo 4', 'Amigo 5']

=======
  friends: IUser[] = []
  

  friendsService = inject(friendsService)
  activatedRoute = inject(ActivatedRoute)

  
  async ngOnInit(): Promise<void> {
    try {
      const response = await this.friendsService.getAllFriend();
      this.friends = response;
      console.log('Respuesta del servicio:', response);
    } catch (error: unknown) {
      console.error('Error al obtener grupos:', error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          console.error('No tiene autorización para acceder a este recurso.');
        } else if (error.status === 204) {
          this.friends = []; // No hay grupos asociados
          console.log('No hay grupos asociados a este usuario.');
        }
      } else {
        console.error('Ocurrió un error inesperado:', error);
      }
    }
  }
>>>>>>> Stashed changes

  mostrarPopup = false;

  abrirPopup() {
    this.mostrarPopup = true;
}

  cerrarPopup() {
    this.mostrarPopup = false;
  }
}
