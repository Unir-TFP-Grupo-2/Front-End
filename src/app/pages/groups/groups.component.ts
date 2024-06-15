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

  async ngOnInit(): Promise<void> {
    this.activatedRouter.params.subscribe(async (params: any) => {
      let responseGrupo = await this.groupService.getById(params.id);
      this.title = responseGrupo.title;
      this.description = responseGrupo.description;
      this.participantsUser = responseGrupo.participants;
      this.total_amount = responseGrupo.total_amount ?? 0;
      this.gastos = responseGrupo.gastos ?? [];
    }
    );

  }


  mostrarPopup = false;

  abrirPopup() {
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }
}  
