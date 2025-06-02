import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './home/home.component'; 
import { DashboardSuperviseurComponent } from './dashboard-superviseur/dashboard-superviseur.component'; 
import { FormulaireOuvrierComponent } from './formulaire-ouvrier/formulaire-ouvrier.component'; 
import { DashboardRapportsComponent } from './dashboard-rapports/dashboard-rapports.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component'; 
import { DashboardProjetsComponent } from './dashboard-projets/dashboard-projets.component';  
import{DashboardSousTraitantsComponent} from './dashboard-sous-traitants/dashboard-sous-traitants.component' 
import { DashboardRapportsAdminComponent } from './dashboard-rapports-admin/dashboard-rapports-admin.component';
const routes: Routes = [ 
   { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'dashboard/superviseur', component: DashboardSuperviseurComponent },
  { path: 'formulaire/ouvrier', component: FormulaireOuvrierComponent },  
   { path: 'dashboard/admin', component: DashboardAdminComponent },
   { path: 'rapports-dashboard', component: DashboardRapportsComponent } ,
    { path: 'projects', component: DashboardProjetsComponent },  
    { path: 'sous-traitants', component: DashboardSousTraitantsComponent } ,
    { path: 'rapports-admin', component: DashboardRapportsAdminComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }  