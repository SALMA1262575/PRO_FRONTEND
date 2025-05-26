
import { Component, OnInit } from '@angular/core';
import { RapportService } from '../rapports.service';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-rapports',
  templateUrl: './dashboard-rapports.component.html',
  styleUrls: ['./dashboard-rapports.component.css']
})
export class DashboardRapportsComponent implements OnInit {
  isMenuOpen = false;
  loading = true;
  errorMessage = '';

  // Statistiques
  totalRapports = 0;
  rapportsOuverts = 0;
  rapportsEnCours = 0;
  rapportsResolus = 0;

  private chart: any; // Stocke l'instance du graphique

  constructor(private rapportService: RapportService, private router: Router) {}

  ngOnInit(): void {
    this.chargerDonnees();
  }

  chargerDonnees(): void {
    this.loading = true;
    this.rapportService.getTousLesRapports().subscribe({
      next: (data) => {
        this.processDonnees(data);
        this.loading = false;
        this.creerGraphique(); // 🎯 Création du graphique ici, après chargement des données
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des rapports', err);
        this.errorMessage = 'Impossible de charger les rapports.';
        this.loading = false;
      }
    });
  }

  processDonnees(rapports: any[]): void {
    this.totalRapports = rapports.length;
    this.rapportsOuverts = rapports.filter((r: any) => r.statut === 'ouvert').length;
    this.rapportsEnCours = rapports.filter((r: any) => r.statut === 'en_cours').length;
    this.rapportsResolus = rapports.filter((r: any) => r.statut === 'resolu').length;
  }

  creerGraphique(): void {
    const ctx = document.getElementById('rapportChart') as HTMLCanvasElement;

    if (!ctx) {
      console.error('Le canvas "rapportChart" n\'a pas été trouvé.');
      return;
    }

    // Nettoie un ancien graphique si existant
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Ouverts', 'En cours', 'Résolus'],
        datasets: [{
          label: 'Statuts des rapports',
          data: [
            this.rapportsOuverts,
            this.rapportsEnCours,
            this.rapportsResolus
          ],
          backgroundColor: ['#28a745', '#ffc107', '#007bff'] // Vert, Orange, Bleu
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Répartition des rapports par statut'
          }
        }
      }
    });
  }

  allerAuxRapports(): void {
    this.router.navigate(['/dashboard/superviseur']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  deconnecter(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}