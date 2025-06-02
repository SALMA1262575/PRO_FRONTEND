import { Component, OnInit } from '@angular/core';
import { RapportService } from '../rapports.service';
import { Router } from '@angular/router';

interface Rapport {
  id: number;
  titre: string;
  categorie: string;
  statut: string;
  equipe?: string;
  description?: string;
  urgent: boolean;
  priorite: boolean;
  criticite: string;
  dateIncident: string | null; 
  Equipe?: string; 
  
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-superviseur.component.html',
  styleUrls: ['./dashboard-superviseur.component.css']
})
export class DashboardSuperviseurComponent implements OnInit {
  isMenuOpen = false;

  rapports: Rapport[] = [];
  filtreCategorie: string = '';
  filtreStatut: string = '';
  loading: boolean = false;
  photos: string[] = [];
  showModal: boolean = false;

  constructor(
    private rapportService: RapportService,
    private router: Router
  ) {}

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
    this.rapportService.filtrerRapports(this.filtreCategorie, this.filtreStatut).subscribe({
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
        console.error("Erreur d'assignation à l'équipe", err);
      }
    });
  }

  voirPhotos(id: number): void {
    this.rapportService.voirPhotos(id).subscribe({
      next: (photos) => {
        this.photos = photos;
        this.showModal = true;
      },
      error: (err) => {
        console.error("Erreur de chargement des photos", err);
      }
    });
  }

  fermerModal(): void {
    this.showModal = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  deconnecter(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}