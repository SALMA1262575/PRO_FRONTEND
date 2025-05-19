import { Component, OnInit } from '@angular/core';
import { RapportService } from '../rapports.service';

interface Rapport {
  id: number;
  categorie: string;
  statut: string;

  equipe?: string;  
  description?: string;
  // autres propriétés selon besoin
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-superviseur.component.html',

})
export class DashboardSuperviseurComponent implements OnInit {

  rapports: Rapport[] = [];
  filtreCategorie: string = '';
  filtreStatut: string = '';
  
  loading: boolean = false;

  constructor(private rapportService: RapportService) {}

  ngOnInit(): void {
    this.getTousLesRapports();
  }

  getTousLesRapports(): void {
    this.loading = true;
    this.rapportService.getTousLesRapports().subscribe({
      next: (data) => {
        this.rapports = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement des rapports', err);
        this.loading = false;
      }
    });
  }

  filtrerRapports(): void {
    this.loading = true;
    this.rapportService.filtrerRapports(this.filtreCategorie, this.filtreStatut, ).subscribe({
      next: (data) => {
        this.rapports = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur de filtrage', err);
        this.loading = false;
      }
    });
  } 
  onChangerStatut(rapport: Rapport, event: Event): void {
  const select = event.target as HTMLSelectElement;
  const nouveauStatut = select.value;
  this.changerStatut(rapport.id, nouveauStatut);
}

  changerStatut(id: number, nouveauStatut: string): void {
    this.rapportService.changerStatut(id, nouveauStatut).subscribe({
      next: () => {
        const rapport = this.rapports.find(r => r.id === id);
        if (rapport) {
          rapport.statut = nouveauStatut;
        }
      },
      error: (err) => {
        console.error('Erreur lors du changement de statut', err);
      }
    });
  }

  assignerEquipe(id: number, equipe: string): void {
    this.rapportService.assignerAEquipe(id, equipe).subscribe({
      next: () => {
        const rapport = this.rapports.find(r => r.id === id);
        if (rapport) {
          rapport.equipe = equipe;
        }
      },
      error: (err) => {
        console.error('Erreur lors de l\'assignation à l\'équipe', err);
      }
    });
  }

photos: string[] = []; // variable pour stocker les URLs des photos

voirPhotos(id: number): void {
  this.rapportService.voirPhotos(id).subscribe({
    next: (photos) => {
      console.log('Photos du rapport:', photos);
      this.photos = photos; // stocke le tableau d'URL pour affichage
    },
    error: (err) => {
      console.error('Erreur lors du chargement des photos', err);
    }
  });
}
}

