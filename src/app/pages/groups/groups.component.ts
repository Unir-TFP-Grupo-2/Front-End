import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { GroupsService } from '../../core/services/groups.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [MatTabsModule],
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
      this.description = responseGrupo.description;
      /*
      SELECT *
      FROM proyecto.usuario
      WHERE user_id IN (
          SELECT user_id
          FROM  proyecto.grupo_miembro
          WHERE group_id = 1
      );
      */
    }
    )
  }
}
