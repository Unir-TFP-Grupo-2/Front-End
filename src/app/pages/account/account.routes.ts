import { Routes } from "@angular/router";
import { AccountComponent } from "./account.component";


export const ACCOUNT_ROUTES: Routes = [
    {path: "account/:id", component: AccountComponent},
]