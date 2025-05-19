import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  private apiUrl = 'http://localhost:8080/api/rapports/avec-photos'; // Ajuste selon ton backend

  constructor(private http: HttpClient) {}

  envoyerRapport(rapport: any, photos: File[]): Observable<any> {
    const formData = new FormData();

    // Convertir l'objet rapport en JSON
    formData.append('rapport', new Blob([JSON.stringify(rapport)], {
      type: 'application/json'
    }));

    // Ajouter toutes les photos
    photos.forEach((photo) => {
      formData.append('photos', photo, photo.name);
    });

    return this.http.post(this.apiUrl, formData);
  }  
  
  
}