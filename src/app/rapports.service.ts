import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  private apiUrl = 'http://localhost:8080/api/rapports';

  constructor(private http: HttpClient) {}

  // Méthode privée pour récupérer les headers avec le token
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

  // Récupère tous les rapports (avec headers)
  getTousLesRapports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tous`, {
      headers: this.getAuthHeaders()
    });
  }

  // Changer le statut d’un rapport (avec headers)
  changerStatut(id: number, statut: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${id}/changer-statut`,
      { statut },
      { headers: this.getAuthHeaders() }
    );
  }

  // Assigner à une équipe (avec headers)
  assignerAEquipe(id: number, equipe: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${id}/assigner-equipe`,
      { equipe },
      { headers: this.getAuthHeaders() }
    );
  }

  // Voir les photos (avec headers)
  voirPhotos(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/photos`, {
      headers: this.getAuthHeaders()
    });
  }

  // Filtrer les rapports (avec headers et params)
  filtrerRapports(categorie?: string, statut?: string): Observable<any[]> {
    let params = new HttpParams();
    if (categorie) {
      params = params.set('categorie', categorie);
    }
    if (statut) {
      params = params.set('statut', statut);
    }

    return this.http.get<any[]>(`${this.apiUrl}/filtrer`, {
      headers: this.getAuthHeaders(),
      params
    });
  }
}