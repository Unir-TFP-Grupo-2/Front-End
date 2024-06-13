import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroupsService } from '../../../../core/services/groups.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IGroup } from '../../../../core/interfaces/igroup';

@Component({
  selector: 'app-new-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-group.component.html',
  styleUrl: './new-group.component.css'
})
export class NewGroupComponent {
  formGroup: FormGroup;

  formBuilder = inject(FormBuilder);
  groupsService = inject(GroupsService);
  router = inject(Router);
  participants: string[] = [];

  @Output() cerrar = new EventEmitter<void>();
  amigos: string[] = ['Amigo 1', 'Amigo 2', 'Amigo 3']
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
      participantInput: null,
      amigosSelect: [[]]
    });
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
    this.participants.splice(index, 1);
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
        numberparticipants: this.participants.length,
        participants: this.participants
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

  /**
   * Emite un evento para cerrar el popup.
   */
  cerrarPopup(): void {
    this.cerrar.emit();
  }
  
}

