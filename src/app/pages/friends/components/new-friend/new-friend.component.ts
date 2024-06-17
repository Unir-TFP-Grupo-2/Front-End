<<<<<<< Updated upstream
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroupsService } from '../../../../core/services/groups.service';
import { Router } from '@angular/router';
=======
import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { friendsService } from '../../../../core/services/friends.service';
import { HttpErrorResponse } from '@angular/common/http';
>>>>>>> Stashed changes

@Component({
  selector: 'app-new-friend',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-friend.component.html',
<<<<<<< Updated upstream
  styleUrl: './new-friend.component.css'
})
export class NewFriendComponent {
  formGroup: FormGroup;
  formBuilder = inject(FormBuilder);
  groupsService = inject(GroupsService);
  router = inject(Router)

  @Output() cerrar = new EventEmitter<void>();

  constructor() {
    this.formGroup = this.formBuilder.group({
      friend: [null, Validators.required],
      groupDescription: null ,
      participantInput: null,
      amigosSelect: [[]]
    });
  }

  async onSubmit() {
    if (this.formGroup.valid) {
      try {
        const response = await this.groupsService.create(this.formGroup.value);
        console.log(response);
        this.router.navigateByUrl('/group/id');
      } catch (error) {
        console.error('Error creating group:', error);
      }
    } else {
      console.log('Formulario no válido');
    }
  }
=======
  styleUrls: ['./new-friend.component.css']
})
export class NewFriendComponent implements OnInit {
  formGroup: FormGroup;
  @Output() cerrar = new EventEmitter<void>();
  @Output() nuevoAmigo = new EventEmitter<{ userId: number, friendEmail: string }>();

  friendsService: friendsService;
  formBuilder = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    this.friendsService = inject(friendsService);
    this.formGroup = this.formBuilder.group({
      friend: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.formGroup.valid) {
      const friendEmail = this.formGroup.get('friend')?.value;
      const userId = Number(localStorage.getItem('user_id'));
      try {
        const response = await this.friendsService.addFriend(userId, friendEmail);
        console.log('Response:', JSON.stringify(response, null, 2));
        alert(`El amigo se ha añadido correctamente con ID: ${response.friendId}`);
        this.nuevoAmigo.emit({ userId, friendEmail });
        this.cerrarPopup();
        this.router.navigate([`/amigos`]); // Adjust the navigation as needed
      } catch (error) {
        console.error('Error al agregar el amigo:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Error de servidor:', error.message);
        }
        alert('Hubo un problema, intentalo de nuevo');
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

>>>>>>> Stashed changes
  cerrarPopup(): void {
    this.cerrar.emit();
  }
}
<<<<<<< Updated upstream


=======
>>>>>>> Stashed changes
