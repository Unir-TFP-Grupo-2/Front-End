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
import { UsersService } from '../../core/services/users.service';
import { GroupsService } from '../../core/services/groups.service';

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
  usersService = inject(UsersService);
  groupsService = inject(GroupsService)
  grupoGastosService = inject(GrupoGastosService)
  router = inject(Router);
  route = inject(ActivatedRoute);

  participants: string[] = [];
  allMembers: { _id: string, fullName: string }[] = [];
  groupId: string = '';
  parent: string = '1';

  @Output() cerrar = new EventEmitter<void>();

  constructor() {
    this.formExpense = this.formBuilder.group({
      groupId: [null, Validators.required],
      user: [null,],
      expense: [null, Validators.required],
      description: [null, Validators.required],
      integrants: [[]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.groupId = this.route.snapshot.paramMap.get('id') || '';
    this.formExpense.patchValue({ groupId: this.groupId });

    try {
      const response = await this.groupsService.getById(this.groupId);
      this.participants = response.participants
      console.log('Respuesta del servicio:', this.participants);
      this.allMembers = this.participants.map((participant: any) => {
        return {
          _id: participant.user_id,
          fullName: `${participant.name} ${participant.lastname}`,
          ...participant,
        };
      });

    } catch (error: unknown) {
      console.error('Error al obtener grupos:', error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          console.error('No tiene autorización para acceder a este recurso.');
        } else if (error.status === 204) {
          this.allMembers = []; // No hay grupos asociados
          console.log('No hay grupos asociados a este usuario.');
        }
      } else {
        console.error('Ocurrió un error inesperado:', error);
      }
    }
  }

  async onSubmit() {
    console.log('Valor del formulario antes de enviar:', this.formExpense.value);
    if (this.formExpense.valid) {
      const expenseData: IExpense = {
        expense_id: '',
        user_id_gasto: this.formExpense.get('user')?.value,
        amount: this.formExpense.get('expense')?.value,
        description: this.formExpense.get('description')?.value,
        group_id: this.formExpense.get('groupId')?.value,
        participants: this.formExpense.get('integrants')?.value
      };

      console.log('Datos del gasto a enviar:', expenseData);

      try {
        const response = await this.grupoGastosService.insert(expenseData);
        if (response.expense_id) {
          alert(`El gasto se ha añadido correctamente`);
          this.cerrarPopup()
          this.router.navigate([`/grupo/${expenseData.group_id}`]).then(() => {
            window.location.reload();
          });
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

  //controlador del parent
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.parent = selectElement.value;
    console.log(this.parent)
  }
 
  cerrarPopup(): void {
    this.cerrar.emit();
  }

  
/*
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
*/
  //Controlador de parent
 




}