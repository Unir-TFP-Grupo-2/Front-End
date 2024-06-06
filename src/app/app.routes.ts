import { Routes } from '@angular/router';
import { GestionGastosComponent } from './admin/gestion-gastos/gestion-gastos.component';

export const routes: Routes = [

    {path: "", pathMatch: "full", redirectTo: "welcome"},

    {
        path:'',
        loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES)
    },

    {
        path:'',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },

    {
        path:'',
        loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES)
    },

    {
        path:'',
        loadChildren: () => import('./pages/account/account.routes').then(m => m.ACCOUNT_ROUTES)
    },

    {
        path:'',
        loadChildren: () => import('./pages/groups/groups.routes').then(m => m.GROUPS_ROUTES)
    },
    
    {
        path:'',
        loadChildren: () => import('./pages/about/about.routes').then(m => m.ABOUT_ROUTES)
    },

    {
        path:'',
        loadChildren: () => import('./pages/contact/contact.routes').then(m => m.CONTACT_ROUTES)
    },

    {path: "logica", component: GestionGastosComponent},
    
    
];
