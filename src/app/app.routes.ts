import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { AccountComponent } from './pages/account/account.component';
import { AboutComponent } from './pages/about/about.component';
import { RecoverComponent } from './pages/recover/recover.component';

export const routes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "welcome"},
    {path: "welcome", component: WelcomeComponent },
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent },
    {path: "home", component: HomeComponent},
    {path: "groups", component: GroupsComponent},
    {path: "account", component: AccountComponent},
    {path: "about", component: AboutComponent},
    {path: "recover", component: RecoverComponent}
    
];
