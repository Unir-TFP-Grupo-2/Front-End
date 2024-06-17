import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { GroupsComponent } from '../../pages/groups/groups.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [AppComponent, GroupsComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent implements OnInit {
  groupForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.groupForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      creatorId: [1, Validators.required], // Hardcoded for this example
      integrantes: this.fb.array([])
    });
  }

  ngOnInit(): void {}

  get integrantes() {
    return this.groupForm.get('integrantes') as FormArray;
  }

  addIntegrante() {
    this.integrantes.push(this.fb.control(''));
  }

  removeIntegrante(index: number) {
    this.integrantes.removeAt(index);
  }

  onSubmit() {
    if (this.groupForm.valid) {
      this.http.post('/', this.groupForm.value)
        .subscribe(
          response => console.log('Grupo creado con éxito', response),
          error => console.error('Error al crear el grupo', error)
        );
    }
  }


}
