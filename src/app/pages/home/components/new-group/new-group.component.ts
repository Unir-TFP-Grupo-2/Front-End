import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-group.component.html',
  styleUrl: './new-group.component.css'
})
export class NewGroupComponent {
  groupForm: FormGroup;
  participants: string[] = [];

  @Output() cerrar = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.groupForm = this.fb.group({
      participantInput: ['']
    });
  }

  addParticipant() {
    const participantInput = this.groupForm.get('participantInput');
    const participantValue = participantInput?.value.trim();

    if (participantValue) {
      this.participants.push(participantValue);
      participantInput?.reset();
    }
  }

  removeParticipant(index: number) {
    this.participants.splice(index, 1);
  }

  onSubmit() {
    const formValue = this.groupForm.value;
    formValue.participants = this.participants;
    console.log(formValue);
  } 

  cerrarPopup() {
    this.cerrar.emit();
  }
}

