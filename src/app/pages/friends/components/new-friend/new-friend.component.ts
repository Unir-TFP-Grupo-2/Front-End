
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroupsService } from '../../../../core/services/groups.service';
import { Router } from '@angular/router';


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
  cerrarPopup(): void {
    this.cerrar.emit();
  }
}

