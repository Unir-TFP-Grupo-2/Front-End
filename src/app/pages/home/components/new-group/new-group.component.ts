import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroupsService } from '../../../../core/services/groups.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IGroup } from '../../../../core/interfaces/igroup';
import { MatListModule, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { FriendsService } from '../../../../core/services/friends.service';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-new-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatListModule],
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent {
  formGroup: FormGroup;
  participants: string[] = [];
  allFriends: { _id: string, fullName: string }[] = [];
  amigosSelectControl;

  @Output() cerrar = new EventEmitter<void>();
  dropdownVisible: boolean = false;
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private groupsService: GroupsService,
    private friendsService: FriendsService,
    private userService: UsersService,
    private router: Router
  ) {
    // Inicializa el control de selección de amigos
    this.amigosSelectControl = this.formBuilder.control([] as string[]);

    // Inicializa el formulario
    this.formGroup = this.formBuilder.group({
      groupName: [null, Validators.required],
      groupDescription: null,
      participantInput: null,
      amigosSelect: this.amigosSelectControl
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      // Obtiene la lista de amigos del servicio
      const response = await this.friendsService.getAllFriend();
      this.allFriends = response ? response.map((friend: any) => ({
        _id: friend.email,
        fullName: `${friend.name} ${friend.lastname}`,
        ...friend,
      })) : [];
    } catch (error) {
      this.handleError(error);
    }
  }

  // Maneja errores de la aplicación
  private handleError(error: unknown) {
    console.error('Error:', error);
    if (error instanceof HttpErrorResponse) {
      if (error.status === 403) {
        console.error('No tiene autorización para acceder a este recurso.');
      } else if (error.status === 204) {
        this.allFriends = [];
      }
    } else {
      console.error('Ocurrió un error inesperado:', error);
    }
  }

  // Maneja el envío del formulario
  async onSubmit() {
    const userID = localStorage.getItem('user_id');
    if (userID) {
      try {
        // Obtiene el correo electrónico del usuario actual
        this.userData = await this.userService.getEmailByUserId(userID);
        if (this.userData?.email) {
          this.participants.push(this.userData.email);
        }
      } catch (error) {
        this.showError('Error al obtener los datos del usuario:', error);
        return;
      }
    }

    if (this.formGroup.valid) {
      const groupData = this.createGroupData();
      try {
        // Inserta el nuevo grupo
        const response = await this.groupsService.insert(groupData);
        if (response.group_id) {
          this.cerrarPopup();
          alert('El grupo se ha añadido correctamente');
          this.router.navigate([`/grupo/${response.group_id}`]);
        } else {
          alert('Hubo un problema, inténtalo de nuevo');
        }
      } catch (error) {
        this.showError('Error al crear el grupo:', error);
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  // Crea los datos del grupo a partir del formulario
  private createGroupData(): IGroup {
    const amigosSelect = this.formGroup.get('amigosSelect')?.value || [];
    const allParticipants = [...amigosSelect, ...this.participants];
    const uniqueParticipants = [...new Set(allParticipants)];
    return {
      group_id: '',
      title: this.formGroup.get('groupName')?.value,
      description: this.formGroup.get('groupDescription')?.value,
      creation_date: new Date(),
      num_participants: uniqueParticipants.length,
      participants: uniqueParticipants,
    };
  }

  // Muestra un error en la consola y una alerta al usuario
  private showError(message: string, error: unknown) {
    console.error(message, error instanceof HttpErrorResponse ? error.message : error);
    alert('Hubo un problema, inténtalo de nuevo');
  }

  // Maneja el cambio en la lista de amigos seleccionados
  onAmigosSelectChange(event: MatSelectionListChange) {
    this.participants = event.source.selectedOptions.selected.map((option: MatListOption) => option.value);
  }

  // Muestra u oculta el desplegable
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Añade un participante a la lista
  addParticipant() {
    const participantInput = this.formGroup.get('participantInput');
    const participantValue = participantInput?.value.trim();
    if (participantValue) {
      this.participants.push(participantValue);
      participantInput?.reset();
    }
  }

  // Elimina un participante de la lista
  removeParticipant(index: number) {
    const participantToRemove = this.participants[index];
    this.participants.splice(index, 1);
    const currentAmigosSelectValues = this.amigosSelectControl.value || [];
    const newAmigosSelectValues = currentAmigosSelectValues.filter(participant => participant !== participantToRemove);
    this.amigosSelectControl.setValue(newAmigosSelectValues);
  }

  // Cierra el popup y emite el evento de cierre
  cerrarPopup() {
    this.cerrar.emit();
  }
}
