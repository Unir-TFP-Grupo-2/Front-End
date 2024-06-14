import { Component, EventEmitter, Output, inject } from '@angular/core';
import { GrupoGastosService } from '../../core/services/grupo-gastos.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatListModule, MatSelectionList,} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IExpense } from '../../core/interfaces/iexpense';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  router = inject(Router);
  route = inject(ActivatedRoute);

  participants: string[] = [];
  allMembers: string[] = ['cristian@gmail.com', 'Miembro2', 'Miembro3', 'Miembro4'];
  groupId: string = '';

  parent: string = '1';
  
  constructor() {
    this.formExpense = this.formBuilder.group({
      groupId: [null, Validators.required],
      user: [null,],
      expense: [null, Validators.required],
      description: [null, Validators.required],
      integrants: [[]],
    });
    console.log('Valor inicial del formulario:', this.formExpense.value);

    this.formExpense.valueChanges.subscribe(value => {
      console.log('Valor del formulario actualizado:', value);
    });
  }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id') || '';
    this.formExpense.patchValue({ groupId: this.groupId });

    // Imprimir valor inicial del formulario
    console.log('Valor inicial del formulario:', this.formExpense.value);

    // Subscribirse a los cambios del formulario
    this.formExpense.valueChanges.subscribe(value => {
      console.log('Valor del formulario actualizado:', value);
    });
  }

  async onSubmit() {
    console.log('Valor del formulario antes de enviar:', this.formExpense.value);
    if (this.formExpense.valid) {
      const expenseData: IExpense = {
        expense_id: ''|| 0,
        user_id_gasto: this.formExpense.get('user')?.value,
        amount: this.formExpense.get('expense')?.value,
        description: this.formExpense.get('description')?.value,
        group_id: this.formExpense.get('groupId')?.value,
        participants: this.formExpense.get('integrants')?.value
      };

      console.log('Datos del gasto a enviar:', expenseData);

      try {
        const response = await this.grupoGastosService.insert(expenseData);
        console.log('Response:', JSON.stringify(response, null, 2));
        if (response.expense_id) {
          alert(`El gasto se ha añadido correctamente`);
          this.router.navigate([`/gasto/${response.expense_id}`]);
        } else {
          alert('Hubo un problema, intentalo de nuevo');
        }
      } catch (error) {
        console.error('Error al crear el gasto:', error);

        if (error instanceof HttpErrorResponse) {
          console.error('Detalles del error:', error.message, error.status, error.statusText, error.url);
        } else {
          console.error('Error desconocido:', error);
        }

        alert('Hubo un problema, intentalo de nuevo');
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
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



}