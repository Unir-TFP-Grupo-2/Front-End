import { Component, inject } from '@angular/core';
import { MiniGroupComponent } from './components/mini-group/mini-group.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { CommonModule } from '@angular/common';
import { IGroup } from '../../core/interfaces/igroup';
import { GroupsService } from '../../core/services/groups.service';
import { ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MiniGroupComponent, NewGroupComponent, CommonModule, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  groups: IGroup[] = []

  groupServices = inject(GroupsService)
  activatedRoute = inject(ActivatedRoute)

  page: number = 1;

  async ngOnInit(): Promise<void> {
    try {
      let response = await this.groupServices.getAll();
      this.groups = response;
      console.log('Respuesta del servicio:', response);
    } catch (error) {
      console.error('Error al obtener grupos:', error);
    }
  }



     /*  this.activatedRoute.queryParams.subscribe((params: any) => {
        const buscar = params.query
        console.log(buscar)
        if (buscar) {
          let name = this.groupServices.quitarTildes(buscar)
          let filterGroups = this.groups.filter(group =>
            this.groupServices.quitarTildes(group.title).includes(title) 
          )
          this.groups = filterGroups
        } if (buscar === undefined || buscar === '') {
          console.log(buscar)
          this.groups = response.results
        }
      }) */


  


  mostrarPopup = false;

  abrirPopup() {
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }

  
}
