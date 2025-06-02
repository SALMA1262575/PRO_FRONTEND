import { Component, OnInit } from '@angular/core';
import { AdminService, SousTraitant } from '../admin.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-dashboard-sous-traitants',
  templateUrl: './dashboard-sous-traitants.component.html',
  styleUrls: ['./dashboard-sous-traitants.component.css']
})
export class DashboardSousTraitantsComponent implements OnInit {
  sousTraitants: SousTraitant[] = [];
  filteredSousTraitants: SousTraitant[] = [];
  nouveauSousTraitant: Partial<SousTraitant> = { nom: '' };
  filterText: string = '';
  isMenuOpen: boolean = false; 
   message: string | null = null;  // 

  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.chargerSousTraitants();
  }

  chargerSousTraitants(): void {
    this.adminService.getAllSousTraitants().subscribe({
      next: (data) => {
        this.sousTraitants = data;
        this.filteredSousTraitants = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des sous-traitants', err);
        this.toastService.showError("Erreur lors du chargement des sous-traitants");
      }
    });
  }

  applyFilter(): void {
    const filter = this.filterText.toLowerCase();
    this.filteredSousTraitants = this.sousTraitants.filter(st =>
      st.nom.toLowerCase().includes(filter)
    );
  }

  ajouterSousTraitant(): void {
    if (!this.nouveauSousTraitant.nom) {
      this.toastService.showError('Le nom du sous-traitant est obligatoire');
      return;
    }

    this.adminService.createSousTraitant(this.nouveauSousTraitant).subscribe({
      next: (st) => {
        this.sousTraitants.push(st);
        this.applyFilter();
        this.nouveauSousTraitant = { nom: '' };
        this.toastService.showSuccess('Sous-traitant ajouté avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout', err);
        this.toastService.showError('Erreur lors de l\'ajout du sous-traitant');
      }
    });
  }

  mettreAJourSousTraitant(sousTraitant: SousTraitant): void {
    this.adminService.updateSousTraitant(sousTraitant.id, sousTraitant).subscribe({
      next: (updated) => {
        const index = this.sousTraitants.findIndex(st => st.id === updated.id);
        if (index !== -1) {
          this.sousTraitants[index] = updated;
        }
        this.applyFilter();
        this.toastService.showSuccess('Sous-traitant mis à jour');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
        this.toastService.showError('Erreur lors de la mise à jour du sous-traitant');
      }
    });
  }

  supprimerSousTraitant(id: number): void {
    this.adminService.deleteSousTraitant(id).subscribe({
      next: () => {
        this.sousTraitants = this.sousTraitants.filter(st => st.id !== id);
        this.applyFilter();
        this.toastService.showSuccess('Sous-traitant supprimé');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        this.toastService.showError('Erreur lors de la suppression du sous-traitant');
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  deconnecter(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  voirUtilisateurs(): void {
    this.router.navigate(['/rapports-dashboard']);
  }

  Projets(): void {
    this.router.navigate(['/projects']);
  }

  Dashboard(): void {
    this.router.navigate(['/rapports-dashboard']);
  }

  Soustraitants(): void {
    this.router.navigate(['/sous-traitants']);
  }

  RapportsR(): void {
    this.router.navigate(['/rapports-admin']);
  }
}
