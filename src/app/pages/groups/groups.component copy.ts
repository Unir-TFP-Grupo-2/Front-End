import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { IGroup } from '../../core/interfaces/igroup';
import { GroupsService } from '../../core/services/groups.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GestionGastosComponent } from '../../admin/gestion-gastos/gestion-gastos.component';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [MatTabsModule, CommonModule, GestionGastosComponent],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent {
  groupService = inject(GroupsService)
  activatedRouter = inject(ActivatedRoute);
  title = "";
  description = "";
  total_amount = 0;
  participantsUser = Array();
  gastos = Array();
  gastos_user = Array();
  pagos = Array();
  total_amount_user = 0;
  total_a_pagar = 0;
  balances: any = {};

  async ngOnInit(): Promise<void> {
    this.activatedRouter.params.subscribe(async (params: any) => {
      let responseGrupo = await this.groupService.getById(params.id);
      this.title = responseGrupo.title;
      this.description = responseGrupo.description;
      this.participantsUser = responseGrupo.participants;
      this.total_amount = responseGrupo.total_amount ?? 0;
      this.total_a_pagar = responseGrupo.total_a_pagar ?? 0;
      this.gastos = responseGrupo.gastos ?? [];
      this.pagos = responseGrupo.pagos ?? [];

      this.calcularBalances(this.pagos);
      console.log(this.balances);
    });
  }

  calcularBalances(pagos: any[]): void {
    pagos.forEach(payment => {
      payment.amount = parseFloat(payment.amount);
    });

    this.balances = {};

    pagos.forEach(payment => {
      console.log(payment);
      if (payment.user_id !== payment.user_id_gasto) {
        this.addDebt(
          payment.user_id_gasto, 
          payment.user_id, 
          payment.amount,
          payment.gasto_user_name,
          payment.gasto_user_lastname,
          payment.nombre_pagador,
          payment.payer_lastname
        );
      }
    });
  }

  addDebt(from: number, to: number, amount: number, fromFirstName: string, fromLastName: string, toFirstName: string, toLastName: string): void {
    if (!this.balances[from]) this.balances[from] = { name: `${fromFirstName} ${fromLastName}`, debts: {} };
    if (!this.balances[to]) this.balances[to] = { name: `${toFirstName} ${toLastName}`, debts: {} };
    if (!this.balances[from].debts[to]) this.balances[from].debts[to] = 0;
    if (!this.balances[to].debts[from]) this.balances[to].debts[from] = 0;
    
    this.balances[from].debts[to] += amount;
    this.balances[to].debts[from] -= amount;
  }

  calcularTotal(): number {
    return this.total_amount_user;
  }

  mostrarPopup = false;

  abrirPopup() {
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }
}
