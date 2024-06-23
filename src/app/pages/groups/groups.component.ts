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
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {
  private groupService = inject(GroupsService);
  private activatedRouter = inject(ActivatedRoute);

  title = "";
  description = "";
  total_amount = 0;
  participantsUser: any[] = [];
  gastos: any[] = [];
  pagos: any[] = [];
  total_amount_user = 0;
  total_a_pagar = 0;
  balances: any[] = [];

  async ngOnInit(): Promise<void> {
    this.activatedRouter.params.subscribe(async (params: any) => {
      try {
        let responseGrupo = await this.groupService.getById(params.id);
        this.title = responseGrupo.title;
        this.description = responseGrupo.description;
        this.participantsUser = responseGrupo.participants;
        this.total_amount = responseGrupo.total_amount ?? 0;
        this.total_a_pagar = responseGrupo.total_a_pagar ?? 0;
        this.gastos = responseGrupo.gastos ?? [];
        this.pagos = responseGrupo.pagos ?? [];

        this.balances = this.calculateDebts(this.pagos);
        console.log(this.balances);
      } catch (error) {
        console.error("Error fetching group data", error);
      }
    });
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

  // Función para obtener el nombre completo del usuario
  getUserName(userId: number): string {
    const user = this.participantsUser.find(participant => participant.user_id === userId);
    console.log(user);
    return user ? `${user.name} ${user.lastname}` : 'Unknown User';
  }

  // Función para calcular las deudas
  calculateDebts(payments: any[]): any[] {
    const users: any = {};

    payments.forEach(payment => {
      const payerId = payment.user_id_gasto;
      const receiverId = payment.user_id;
      const amount = parseFloat(payment.amount);

      if (!users[payerId]) {
        users[payerId] = { paid: 0, owes: {} };
      }

      if (!users[receiverId]) {
        users[receiverId] = { paid: 0, owes: {} };
      }

      users[payerId].paid += amount;
      if (!users[payerId].owes[receiverId]) {
        users[payerId].owes[receiverId] = 0;
      }
      users[payerId].owes[receiverId] += amount;
    });

    const debts: any[] = [];

    Object.keys(users).forEach(payerId => {
      Object.keys(users[payerId].owes).forEach(receiverId => {
        if (payerId !== receiverId) {
          const amount = users[payerId].owes[receiverId];
          debts.push({
            from: {
              id: payerId,
              name: this.getUserName(parseInt(payerId))
            },
            to: {
              id: receiverId,
              name: this.getUserName(parseInt(receiverId))
            },
            amount: amount.toFixed(2)
          });
        }
      });
    });

    return debts;
  }
}
