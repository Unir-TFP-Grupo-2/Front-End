import { Routes } from "@angular/router";
import { GroupsComponent } from "./groups.component";


export const GROUPS_ROUTES: Routes = [
    {path: "grupo/:id", component: GroupsComponent},
]