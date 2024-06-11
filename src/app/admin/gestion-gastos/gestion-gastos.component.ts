import { Component, EventEmitter, Output, inject } from '@angular/core';
import { GrupoGastosService } from '../../core/services/grupo-gastos.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatListModule, MatSelectionList,} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-gestion-gastos',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatSelectionList, MatListModule,MatFormFieldModule, MatSelectModule],
  templateUrl: './gestion-gastos.component.html',
  styleUrls: ['./gestion-gastos.component.css'],
})

export class GestionGastosComponent {
  formExpense: FormGroup;
  formBuilder = inject(FormBuilder);

  allMembers: string[] = ['Miembro1', 'Miembro2', 'Miembro3', 'Miembro4'];

  parent: string = '1';
  
  constructor() {
    this.formExpense = this.formBuilder.group({
      user: [null, Validators.required],
      expense: null,
      subject: null ,
      quien: [[]],
    });
    
  }

  nuevoUsuario = '';
  nuevoGasto = {
    usuario: '',
    cantidad: 0,
    descripcion: ''
  };
  usuarios: string[] = [];
  gastosIndividuales: { [key: string]: number } = {};
  deudas: { [key: string]: number } = {};
  transacciones: { deudor: string, acreedor: string, cantidad: number }[] = [];
  grupoGastosService = inject(GrupoGastosService)

  @Output() cerrar = new EventEmitter<void>();

  agregarUsuario(): void {
    if (this.nuevoUsuario.trim()) {
      this.grupoGastosService.agregarUsuario(this.nuevoUsuario.trim());
      this.usuarios = [...this.grupoGastosService['usuarios']];
      this.nuevoUsuario = '';
    }
  }

  registrarGasto(): void {
    if (this.nuevoGasto.usuario && this.nuevoGasto.cantidad > 0) {
      this.grupoGastosService.registrarGasto(this.nuevoGasto.usuario, this.nuevoGasto.cantidad, this.nuevoGasto.descripcion);
      this.nuevoGasto = { usuario: '', cantidad: 0, descripcion: '' };
      this.actualizarGastos();
    }
  }

  actualizarGastos(): void {
    this.gastosIndividuales = this.grupoGastosService.calcularGastosIndividuales();
    this.deudas = this.grupoGastosService.calcularDeudas();
    this.transacciones = this.grupoGastosService.calcularTransacciones();
  }

  //Controlador de parent
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.parent = selectElement.value;
    console.log(this.parent)
  }


  
 
  cerrarPopup(): void {
    this.cerrar.emit();
  }

  onSubmit() {
    // Aquí manejas el envío del formulario
    console.log(this.formExpense.value);
  }
}