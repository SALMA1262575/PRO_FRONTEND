import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardSuperviseurComponent } from './dashboard-superviseur/dashboard-superviseur.component';
import { FormulaireOuvrierComponent } from './formulaire-ouvrier/formulaire-ouvrier.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardRapportsComponent } from './dashboard-rapports/dashboard-rapports.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardSuperviseurComponent,
    FormulaireOuvrierComponent,
    DashboardRapportsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Utilisation du module de routing
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
