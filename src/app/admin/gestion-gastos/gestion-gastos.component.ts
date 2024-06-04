import { Component } from '@angular/core';
import { GrupoGastosService } from '../../core/services/grupo-gastos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-gastos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion-gastos.component.html',
  styleUrls: ['./gestion-gastos.component.css'],
  providers: [GrupoGastosService]
})

export class GestionGastosComponent {
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

  constructor(private grupoGastosService: GrupoGastosService) {}

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
}
