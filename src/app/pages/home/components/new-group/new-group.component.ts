import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroupsService } from '../../../../core/services/groups.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IGroup } from '../../../../core/interfaces/igroup';
import { MatListModule, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { friendsService } from '../../../../core/services/friends.service';
import { UsersService } from '../../../../core/services/users.service';


@Component({
  selector: 'app-new-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatListModule],
  templateUrl: './new-group.component.html',
  styleUrl: './new-group.component.css'
})
export class NewGroupComponent {
  formGroup: FormGroup;

  formBuilder = inject(FormBuilder);
  groupsService = inject(GroupsService);

  
  friendsService = inject(friendsService)
  userService = inject(UsersService);
  router = inject(Router);

  participants: string[] = [];
  allFriends: { _id: string, fullName: string }[] = [];
  amigosSelectControl = this.formBuilder.control([] as string[]);

  @Output() cerrar = new EventEmitter<void>();
  
  dropdownVisible: boolean = false;

  /**
   * Constructor de NewGroupComponent.
   * 
   * @param {FormBuilder} fb - El form builder usado para crear formularios reactivos.
   */
  constructor() {
    this.formGroup = this.formBuilder.group({
      groupName: [null, Validators.required],
      groupDescription: null ,
      participantInput: [null,],
      amigosSelect: this.amigosSelectControl
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.friendsService.getAllFriend();
      console.log('Respuesta del servicio:', response);
      this.allFriends = response.map((friend: any) => {
        return {
          _id: friend.email,
          fullName: `${friend.name} ${friend.lastname}`,
          ...friend,
        };
      });
    } catch (error: unknown) {
      console.error('Error al obtener amigos:', error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          console.error('No tiene autorización para acceder a este recurso.');
        } else if (error.status === 204) {
          this.allFriends = []; // No hay amigos asociados
          console.log('No hay amigos asociados a este usuario.');
        }
      } else {
        console.error('Ocurrió un error inesperado:', error);
      }
    }

    /* const userID = localStorage.getItem('user_id');

  if (userID) {
    try {
      // Usa el userID para obtener los datos del usuario
      const userData = await this.userService.getAll();
      console.log(userData)
      // Añade el email del usuario a la lista de participantes
      this.participants.push(userData.email);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  } */
  }


    /**
   * Envía los datos del formulario y la lista de participantes.
   */
    async onSubmit() {
      if (this.formGroup.valid) {
        const groupData: IGroup = {
          group_id: '',
          title: this.formGroup.get('groupName')?.value,
          description: this.formGroup.get('groupDescription')?.value,
          creation_date: new Date(),
          num_participants: this.participants.length,
          participants: this.formGroup.get('amigosSelect')?.value
        };
        
        try {
          const response = await this.groupsService.insert(groupData);
          console.log('Response:', JSON.stringify(response, null, 2));
          if (response.group_id !== null) { 
            alert(`El grupo se ha añadido correctamente`);
            this.cerrarPopup()
            this.router.navigate([`/grupo/${response.group_id}`]);
          } else {
            alert('Hubo un problema, intentalo de nuevo');
          }
        } catch (error) {
          console.error('Error al crear el grupo:', error);
          alert('Hubo un problema, intentalo de nuevo');
        }
      } else {
        alert('Por favor, completa todos los campos requeridos.');
      }
    }


    // Añade los amigos seleccionados a la lista de participantes
    onAmigosSelectChange(event: MatSelectionListChange) {
      this.participants = event.source.selectedOptions.selected.map((option: MatListOption) => option.value);
    }
       
  
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }


  /**
   * Agrega un nuevo participante a la lista de participantes.
   */
  addParticipant(): void {
    const participantInput = this.formGroup.get('participantInput');
    const participantValue = participantInput?.value.trim();

    if (participantValue) {
      this.participants.push(participantValue);
      participantInput?.reset();
    }
  }

  /**
   * Elimina un participante de la lista de participantes.
   * 
   * @param {number} index - El índice del participante a eliminar.
   */
  removeParticipant(index: number): void {

    // Obtiene el participante que se va a eliminar
    const participantToRemove = this.participants[index];
  
    // Elimina el participante de la lista de participantes
    this.participants.splice(index, 1);
  
    // Obtiene los valores actuales de amigosSelectControl
    const currentAmigosSelectValues = this.amigosSelectControl.value || [];
  
    // Filtra los valores para eliminar el participante que se acaba de eliminar
    const newAmigosSelectValues = currentAmigosSelectValues.filter(participant => participant !== participantToRemove);
  
    // Actualiza el valor de amigosSelectControl
    this.amigosSelectControl.setValue(newAmigosSelectValues);
  }
  



  /**
   * Emite un evento para cerrar el popup.
   */
  cerrarPopup(): void {
    this.cerrar.emit();
  }
  
}

