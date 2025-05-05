import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode'; // ✅ Bien importer comme ça

interface JwtPayload {
  role: string;
  exp: number;
}

@Component({
  selector: 'app-home',
  template: `<div>Chargement...</div>`
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      // ✅ Appel avec .jwtDecode()
      const decoded = jwt_decode.jwtDecode<JwtPayload>(token);

      if (decoded.role === 'SUPERVISEUR') {
        this.router.navigate(['/dashboard/superviseur']);
      } else if (decoded.role === 'OUVRIER') {
        this.router.navigate(['/formulaire/ouvrier']);
      } else {
        alert("Rôle inconnu");
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error("Erreur lors du décodage du token", error);
      this.router.navigate(['/login']);
    }
  }
}
