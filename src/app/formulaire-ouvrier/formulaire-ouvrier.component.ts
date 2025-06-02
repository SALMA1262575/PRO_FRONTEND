import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RapportService } from '../rapport.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';
interface Superviseur {
  id: number;
  nom: string;
}

@Component({
  selector: 'app-formulaire-ouvrier',
  templateUrl: './formulaire-ouvrier.component.html',
  styleUrls: ['./formulaire-ouvrier.component.css']
})
export class FormulaireOuvrierComponent implements OnInit {
  isMenuOpen = false;
  isLoading: boolean = false;
  successMessage: string = '';
  priorityOption: string = ''; // ← Liste déroulante : "faible", "moyenne", "haute"

  rapport = {
    titre: '',
    description: '',
    urgent: false,
    categorie: '',
    assigneA: {
      id: null as number | null
    },
    projetId: null as number | null,
    sousTraitance: false,
    sousTraitantId: null as number | null,
    criticite: '',
    dateIncident: ''
  };

  photos: File[] = [];
  superviseurs: Superviseur[] = [];
  projets: any[] = [];
  sousTraitants: any[] = [];

  levelsCriticite = ['Mineur', 'Majeur', 'Critique'];

  categories = [
    { value: 'securite', label: 'Sécurité' },
    { value: 'structure', label: 'Structure' },
    { value: 'materiel', label: 'Matériel' },
    { value: 'autre', label: 'Autre' }
  ];

  constructor(
    private http: HttpClient,
    private rapportService: RapportService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.chargerSuperviseurs();
    this.chargerProjets();
    this.chargerSousTraitants();
  }

  chargerSuperviseurs(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté');
      return;
    }
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get<Superviseur[]>('http://localhost:8080/api/rapports/superviseurs', { headers })
      .subscribe(
        data => this.superviseurs = data,
        error => {
          console.error('Erreur lors du chargement des superviseurs', error);
          alert('Impossible de charger les superviseurs. Reconnectez-vous.');
        }
      );
  }

  chargerProjets(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté');
      return;
    }
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get<any[]>('http://localhost:8080/api/projets/Ls', { headers }).subscribe(
      data => this.projets = data,
      error => console.error('Erreur lors du chargement des projets', error)
    );
  }

  chargerSousTraitants(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté');
      return;
    }
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get<any[]>('http://localhost:8080/api/sous-traitants/Ls', { headers }).subscribe(
      data => this.sousTraitants = data,
      error => console.error('Erreur lors du chargement des sous-traitants', error)
    );
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photos = Array.from(input.files);
    }
  }

  onCheckboxChange(): void {
    if (this.rapport.sousTraitance && this.sousTraitants.length === 0) {
      this.chargerSousTraitants();
    }
  }

  isValidDateFormat(dateStr: string): boolean {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!regex.test(dateStr)) return false;
    const date = new Date(dateStr);
    return date.toString() !== "Invalid Date";
  }

  onSubmit(): void {
    if (!this.rapport.assigneA.id) {
      alert('Veuillez choisir un superviseur.');
      return;
    }

    if (!this.photos.length) {
      alert('Veuillez sélectionner au moins une photo.');
      return;
    }

    if (!this.rapport.dateIncident || !this.isValidDateFormat(this.rapport.dateIncident)) {
      alert('Veuillez entrer une date d\'incident valide au format jj/mm/aaaa.');
      return;
    }

    // Conversion de la priorité texte en booléen
    const mapPriorityToBoolean = (value: string): boolean => {
      return value === 'moyenne' || value === 'haute';
    };

    const rapportFinal = {
      titre: this.rapport.titre || null,
      description: this.rapport.description,
      urgent: this.rapport.urgent,
      categorie: this.rapport.categorie || null,
      priorite: mapPriorityToBoolean(this.priorityOption), // ✅ Priorité convertie en boolean
      criticite: this.rapport.criticite ? this.rapport.criticite.toUpperCase() : null,
      dateIncident: this.rapport.dateIncident,
      assigneA: { id: this.rapport.assigneA.id },
      projet: this.rapport.projetId ? { id: this.rapport.projetId } : null,
      sousTraitance: this.rapport.sousTraitance || false,
      sousTraitant: this.rapport.sousTraitantId ? { id: this.rapport.sousTraitantId } : null
    };

    this.isLoading = true;

   

  this.rapportService.envoyerRapport(rapportFinal, this.photos).subscribe({
    next: (response) => {
      this.toastService.showSuccess('✅ Rapport soumis avec succès !');
      this.resetForm();
      this.isLoading = false;
    },
    error: (error) => {
      console.error('❌ Erreur lors de l’envoi', error);
      this.toastService.showError("❌ Échec de l'envoi du rapport.");
      this.isLoading = false;
    }
  });
}

  resetForm(): void {
    this.rapport = {
      titre: '',
      description: '',
      urgent: false,
      categorie: '',
      assigneA: { id: null },
      projetId: null,
      sousTraitance: false,
      sousTraitantId: null,
      criticite: '',
      dateIncident: ''
    };
    this.photos = [];
    this.priorityOption = ''; // Réinitialisation de la liste déroulante
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