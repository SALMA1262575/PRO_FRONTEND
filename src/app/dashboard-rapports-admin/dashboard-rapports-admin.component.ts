import { Component, OnInit } from '@angular/core';
import { AdminService, Rapport } from '../admin.service';
import { Router } from '@angular/router';  
import { ToastService } from '../toast.service'; // ✅ Vérifiez cet import
@Component({
  selector: 'app-dashboard-rapports-admin',
  templateUrl: './dashboard-rapports-admin.component.html',
  styleUrls: ['./dashboard-rapports-admin.component.css']
})
export class DashboardRapportsAdminComponent implements OnInit {
  rapports: Rapport[] = [];
  message: string = '';
  isMenuOpen: boolean = false; 
    photos: string[] = [];
  showModal: boolean = false;

  constructor(
    private adminService: AdminService, 
    private toastService: ToastService ,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerRapports();
  }
chargerRapports(): void {
  this.adminService.getAllRapports().subscribe({
    next: data => {
      this.rapports = data;
    },
    error: err => {
      console.error('Erreur lors du chargement des rapports', err);
      this.toastService.showError('Impossible de charger les rapports.');
    }
  });
}
  
mettreAJourRapport(rapport: Rapport): void {
  this.adminService.updateRapport(rapport.id, rapport).subscribe({
    next: updated => {
      const index = this.rapports.findIndex(r => r.id === updated.id);
      if (index !== -1) this.rapports[index] = updated;
      this.toastService.showSuccess('Rapport mis à jour');
    },
    error: err => {
      console.error('Erreur lors de la mise à jour', err);
      this.toastService.showError('Erreur lors de la mise à jour');
    }
  });
  }
supprimerRapport(id: number): void {
  this.adminService.deleteRapport(id).subscribe({
    next: () => {
      this.rapports = this.rapports.filter(r => r.id !== id);
      this.toastService.showSuccess('Rapport supprimé');
    },
    error: err => {
      console.error('Erreur lors de la suppression', err);
      this.toastService.showError('Erreur lors de la suppression du rapport');
    }
  });
}

changerStatut(rapport: Rapport): void {
  this.adminService.changerStatutRapport(rapport.id, rapport.statut).subscribe({
    next: updated => {
      const index = this.rapports.findIndex(r => r.id === updated.id);
      if (index !== -1) this.rapports[index] = updated;
      this.toastService.showSuccess('Statut du rapport mis à jour');
    },
    error: err => {
      console.error('Erreur lors du changement de statut', err);
      this.toastService.showError('Erreur lors du changement de statut');
    }
  });
}
 voirPhotos(id: number): void {
  this.adminService.voirPhotos(id).subscribe({
    next: (photos) => {
      this.photos = photos;
      this.showModal = true;
    },
    error: (err) => {
      console.error("Erreur de chargement des photos", err);
      this.toastService.showError("Impossible de charger les photos");
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
  voirRapports(): void {
    this.router.navigate(['/rapports-dashboard']);
  }  
  
  
  Utilisateurs(): void {
  this.router.navigate(['/dashboard/admin']);
}   
Soustraitants(): void {
  this.router.navigate(['/sous-traitants']);
}  
   Projects(): void {
    this.router.navigate(['/projects']);
  } 

 RapportsR(): void {
    this.router.navigate(['/rapports-admin']);
  }
}