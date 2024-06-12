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
  groups: IGroup[] = []

  groupService = inject(GroupsService)
  activatedRoute = inject(ActivatedRoute)

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      try {
        const response = await this.groupService.getById(id);
        this.groups = response ? [response] : [];
        console.log('Respuesta del servicio:', response);
        if (!response) {
          console.log('No hay grupos asociados a este usuario.');
        }
      } catch (error: unknown) {
        console.error('Error al obtener grupos:', error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            console.error('No tiene autorización para acceder a este grupo.');
          } else if (error.status === 200) {
            this.groups = [];
            console.log('No hay grupos asociados a este usuario.');
          }
        } else {
          console.error('Ocurrió un error inesperado:', error);
        }
      }
    } else {
      console.error('No se proporcionó un ID de grupo.');
    }
  }


  mostrarPopup = false;

  abrirPopup() {
    this.mostrarPopup = true;
}

  cerrarPopup() {
    this.mostrarPopup = false;
  }
}  
