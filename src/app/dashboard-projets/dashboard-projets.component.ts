import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service'; 
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';

interface Projet {
  id: number;
  nom: string;
}

@Component({
  selector: 'app-dashboard-projets',
  templateUrl: './dashboard-projets.component.html',
  styleUrls: ['./dashboard-projets.component.css']
})
export class DashboardProjetsComponent implements OnInit {
  projets: Projet[] = [];
  filteredProjets: Projet[] = [];
  nouveauProjet: Partial<Projet> = {};
  filterText: string = '';  // Pour filtrage
  isMenuOpen: boolean = false; 
    message: string | null = null;


  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastService: ToastService   // Injection ToastService
  ) {}

  ngOnInit(): void {
    this.chargerProjets();
  }

  chargerProjets(): void {
    this.adminService.getAllProjets().subscribe({
      next: data => {
        this.projets = data;
        this.appliquerFiltre();
      },
      error: err => {
        console.error('Erreur lors du chargement des projets', err);
        this.toastService.showError('Impossible de charger les projets.');
      }
    });
  }

  ajouterProjet(): void {
    if (!this.nouveauProjet.nom) {
      this.toastService.showError('Le nom du projet est requis.');
      return;
    }

    this.adminService.createProjet(this.nouveauProjet).subscribe({
      next: projet => {
        this.projets.push(projet);
        this.appliquerFiltre();
        this.nouveauProjet = {};
        this.toastService.showSuccess('Projet ajouté avec succès');
      },
      error: err => {
        console.error('Erreur lors de l\'ajout du projet', err);
        this.toastService.showError('Erreur lors de l’ajout du projet');
      }
    });
  }

  mettreAJourProjet(projet: Projet): void {
    this.adminService.updateProjet(projet.id, projet).subscribe({
      next: updated => {
        const index = this.projets.findIndex(p => p.id === updated.id);
        if (index !== -1) this.projets[index] = updated;
        this.appliquerFiltre();
        this.toastService.showSuccess('Projet mis à jour');
      },
      error: err => {
        console.error('Erreur lors de la mise à jour', err);
        this.toastService.showError('Erreur lors de la mise à jour du projet');
      }
    });
  }

  supprimerProjet(id: number): void {
    this.adminService.deleteProjet(id).subscribe({
      next: () => {
        this.projets = this.projets.filter(p => p.id !== id);
        this.appliquerFiltre();
        this.toastService.showSuccess('Projet supprimé');
      },
      error: err => {
        console.error('Erreur lors de la suppression', err);
        this.toastService.showError('Erreur lors de la suppression du projet');
      }
    });
  }

  appliquerFiltre(): void {
    const filter = this.filterText.toLowerCase();
    this.filteredProjets = this.projets.filter(p => p.nom.toLowerCase().includes(filter));
  }

  onFilterChange(value: string): void {
    this.filterText = value;
    this.appliquerFiltre();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  deconnecter(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  voirRapports(): void {
    this.router.navigate(['/rapports-dashboard']);
  }  
  
  Utilisateurs(): void {
    this.router.navigate(['/dashboard/admin']);
  }   

  Soustraitants(): void {
    this.router.navigate(['/sous-traitants']);
  } 

  RapportsR(): void {
    this.router.navigate(['/rapports-admin']);
  }
}
