import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Projet {
  id: number;
  nom: string;
}

export interface SousTraitant {
  id: number;
  nom: string;
}

export interface Rapport {
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
  photos?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin/utilisateurs';
  private apiProjets = 'http://localhost:8080/api/projets';
  private apiSousTraitants = 'http://localhost:8080/api/sous-traitants';
  private apiRapports = 'http://localhost:8080/api/rapports';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Aucun token trouvé dans le localStorage');
    }
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
  }

  // === UTILISATEURS ===
  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user, { headers: this.getAuthHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  resetPassword(id: number, newPassword: string): Observable<any> {
    const body = { nouveauMdp: newPassword };
    return this.http.post(`${this.apiUrl}/${id}/reset-mdp`, body, { headers: this.getAuthHeaders() });
  }

  // === PROJETS === 
  
  getAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiProjets}/Ls`, { headers: this.getAuthHeaders() });
  }

  createProjet(projet: Partial<Projet>): Observable<Projet> {
    return this.http.post<Projet>(`${this.apiProjets}/cr`, projet, { headers: this.getAuthHeaders() });
  }

  updateProjet(id: number, projet: Partial<Projet>): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiProjets}/${id}`, projet, { headers: this.getAuthHeaders() });
  }

  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiProjets}/${id}`, { headers: this.getAuthHeaders() });
  }

  // === SOUS-TRAITANTS ===
  getAllSousTraitants(): Observable<SousTraitant[]> {
    return this.http.get<SousTraitant[]>(`${this.apiSousTraitants}/Ls`, { headers: this.getAuthHeaders() });
  }

  createSousTraitant(st: Partial<SousTraitant>): Observable<SousTraitant> {
    return this.http.post<SousTraitant>(`${this.apiSousTraitants}/Cr`, st, { headers: this.getAuthHeaders() });
  }

  updateSousTraitant(id: number, st: Partial<SousTraitant>): Observable<SousTraitant> {
    return this.http.put<SousTraitant>(`${this.apiSousTraitants}/${id}`, st, { headers: this.getAuthHeaders() });
  }

  deleteSousTraitant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiSousTraitants}/${id}`, { headers: this.getAuthHeaders() });
  }

  // === RAPPORTS (admin) ===
  getAllRapports(): Observable<Rapport[]> {
  return this.http.get<Rapport[]>(`${this.apiRapports}/tous`, { headers: this.getAuthHeaders() });
}

  updateRapport(id: number, rapport: Partial<Rapport>): Observable<Rapport> {
    return this.http.put<Rapport>(`${this.apiRapports}/${id}`, rapport, { headers: this.getAuthHeaders() });
  }

  deleteRapport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiRapports}/${id}`, { headers: this.getAuthHeaders() });
  } 
  
  voirPhotos(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiRapports}/${id}/photos`, {
      headers: this.getAuthHeaders()
    });
  }

  changerStatutRapport(id: number, statut: string): Observable<Rapport> {
    return this.http.post<Rapport>(`${this.apiRapports}/${id}/changer-statut`, { statut }, { headers: this.getAuthHeaders() });
  }
}