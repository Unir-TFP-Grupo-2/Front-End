import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { GroupsService } from '../../core/services/groups.service';
import { ActivatedRoute } from '@angular/router';
import { GestionGastosComponent } from '../../admin/gestion-gastos/gestion-gastos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [MatTabsModule, GestionGastosComponent, CommonModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent {
  grupo = inject(GroupsService);
  activatedRouter = inject(ActivatedRoute);
  title = "";
  description = "";
  participates = Array();
  ngOnInit(): void {
    this.activatedRouter.params.subscribe(async (params: any) => {
      let responseGrupo = await this.grupo.getById(params.id);
      this.title = responseGrupo.title;
      this.description = responseGrupo.description
    }
    )
  }
  mostrarPopup = false;

  abrirPopup() {
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }
}
