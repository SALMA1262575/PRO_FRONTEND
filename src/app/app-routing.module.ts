import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './home/home.component'; 
import { DashboardSuperviseurComponent } from './dashboard-superviseur/dashboard-superviseur.component'; 
import { FormulaireOuvrierComponent } from './formulaire-ouvrier/formulaire-ouvrier.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'dashboard/superviseur', component: DashboardSuperviseurComponent },
  { path: 'formulaire/ouvrier', component: FormulaireOuvrierComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }