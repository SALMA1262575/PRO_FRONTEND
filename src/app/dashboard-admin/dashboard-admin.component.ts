import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';

interface Utilisateur {
  id: number;
  email: string;
  motDePasse: string;
  nom: string;
  role: string;
}

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  filteredUtilisateurs: Utilisateur[] = [];
  nouveauUtilisateur: Partial<Utilisateur> = { email: '', motDePasse: '', nom: '', role: '' };
  filterText: string = '';
  isMenuOpen: boolean = false;
  message: string | null = null;
  nouveauxMotsDePasse: { [userId: number]: string } = {}; 
  formVisible: boolean = false;


  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void { 
     this.filterText = '';
    this.chargerUtilisateurs(); 

  }

  chargerUtilisateurs(): void {
    this.adminService.getAllUsers().subscribe({
      next: data => {
        this.utilisateurs = data;
        this.appliquerFiltre();
      },
      error: err => {
        console.error('Erreur lors du chargement des utilisateurs', err);
        this.toastService.showError("Erreur lors du chargement des utilisateurs");
      }
    });
  }

  ajouterUtilisateur(): void {
    const u = this.nouveauUtilisateur;
    if (!u.email || !u.motDePasse || !u.role) {
      this.toastService.showError('Email, mot de passe et rôle sont obligatoires');
      return;
    }

    this.adminService.createUser(u).subscribe({
      next: user => {
        this.utilisateurs.push(user);
        this.appliquerFiltre();
        this.nouveauUtilisateur = { email: '', motDePasse: '', nom: '', role: '' };
        this.toastService.showSuccess('Utilisateur ajouté avec succès');
      },
      error: err => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur', err);
        this.toastService.showError('Erreur lors de l\'ajout de l\'utilisateur');
      }
    });
  }

  supprimerUtilisateur(id: number): void {
    this.adminService.deleteUser(id).subscribe({
      next: () => {
        this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
        this.appliquerFiltre();
        this.toastService.showSuccess('Utilisateur supprimé');
      },
      error: err => {
        console.error('Erreur lors de la suppression', err);
        this.toastService.showError('Erreur lors de la suppression de l\'utilisateur');
      }
    });
  }

  resetPassword(userId: number, newPassword: string): void {
    if (!newPassword || newPassword.length < 6) {
      this.toastService.showError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    this.adminService.resetPassword(userId, newPassword).subscribe({
      next: () => {
        this.nouveauxMotsDePasse[userId] = '';
        this.toastService.showSuccess(`Mot de passe réinitialisé pour l'utilisateur ID ${userId}`);
      },
      error: err => {
        console.error('Erreur lors de la réinitialisation du mot de passe', err);
        this.toastService.showError('Erreur lors de la réinitialisation du mot de passe');
      }
    });
  }

appliquerFiltre(): void {
  const filter = this.filterText.toLowerCase();
  this.filteredUtilisateurs = this.utilisateurs.filter(u =>
    u.email.toLowerCase().includes(filter) ||
    (u.nom && u.nom.toLowerCase().includes(filter)) ||
    (u.role && u.role.toLowerCase().includes(filter))
  );
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

  // Navigation
  voirRapports(): void {
    this.router.navigate(['/rapports-dashboard']);
  }

  Projets(): void {
    this.router.navigate(['/projects']);
  }

  Soustraitants(): void {
    this.router.navigate(['/sous-traitants']);
  }

  RapportsR(): void {
    this.router.navigate(['/rapports-admin']);
  }
}
