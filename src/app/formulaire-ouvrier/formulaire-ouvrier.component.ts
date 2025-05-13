import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RapportService } from '../rapport.service'; // Ajuste selon ta structure

interface Superviseur {
  id: number;
  nom: string;
}

@Component({
  selector: 'app-formulaire-ouvrier',
  templateUrl: './formulaire-ouvrier.component.html'
})
export class FormulaireOuvrierComponent implements OnInit {

  rapport = {
    description: '',
    urgent: false,
    categorie: '',
    assigneA: {
      id: null as number | null
    }
  };

  photos: File[] = [];
  superviseurs: Superviseur[] = [];

  categories = [
    { value: 'securite', label: 'Sécurité' },
    { value: 'structure', label: 'Structure' },
    { value: 'materiel', label: 'Matériel' },
    { value: 'autre', label: 'Autre' }
  ];

  constructor(
    private http: HttpClient,
    private rapportService: RapportService
  ) {}

  ngOnInit(): void {
    this.chargerSuperviseurs();
  }

  chargerSuperviseurs(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Vous devez être connecté');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<{ id: number, nom: string }[]>('http://localhost:8080/api/rapports/superviseurs', { headers })
      .subscribe(
        data => {
          this.superviseurs = data;
        },
        error => {
          console.error('Erreur lors du chargement des superviseurs', error);
          alert('Impossible de charger les superviseurs. Reconnectez-vous.');
        }
      );
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photos = Array.from(input.files);
    }
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

    console.log('Envoi du rapport...', this.rapport);

    this.rapportService.envoyerRapport(this.rapport, this.photos).subscribe(
      response => {
        console.log('✅ Rapport envoyé avec succès', response);
        alert('Rapport soumis avec succès !');
        this.resetForm();
      },
      error => {
        console.error('❌ Erreur lors de l\'envoi', error);
        alert("Échec de l'envoi du rapport.");
      }
    );
  }

  resetForm(): void {
    this.rapport = {
      description: '',
      urgent: false,
      categorie: '',
      assigneA: {
        id: null
      }
    };
    this.photos = [];
  }
}