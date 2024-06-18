import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FriendsService} from '../../../../core/services/friends.service';
@Component({
  selector: 'app-new-friend',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-friend.component.html',
  styleUrl: './new-friend.component.css'
})
export class NewFriendComponent {
  formGroup: FormGroup;
  formBuilder = inject(FormBuilder);
  friendsService = inject(FriendsService)
  router = inject(Router)

  @Output() cerrar = new EventEmitter<void>();

  constructor() {
    this.formGroup = this.formBuilder.group({
      friend: [null, Validators.required],
    });
  }

  async onSubmit() {
    if (this.formGroup.valid) {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          throw new Error('User ID no encontrado en localStorage');
        }
        const friendEmail = this.formGroup.get('friend')?.value;
        const response = await this.friendsService.addFriend(Number(userId), friendEmail);
        console.log(response);
        this.router.navigateByUrl('/friends');
      } catch (error) {
        console.error('Error añadiendo amigo:', error);
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  cerrarPopup(): void {
    this.cerrar.emit();
  }
}