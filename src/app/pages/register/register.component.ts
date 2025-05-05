import { Component } from '@angular/core';
import { AuthService } from '../../auth.service'; // Importez votre service d'authentification
import { RegisterRequest } from '../../models/RegisterRequest'; // Importez le modèle RegisterRequest

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest: RegisterRequest = { nom: '', email: '', motDePasse: '', role: '' }; // Définissez l'objet registerRequest
  errorMessage: string = ''; // Définissez la propriété errorMessage

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.registerRequest).subscribe({
        next: (response) => {
            console.log('Réponse du ff backend :', response);
            this.errorMessage = 'OK SENT ////'; // Effacer le message d'erreur
        },
        error: (err) => {
            console.error('Erreur reçue du backend :', err);
            this.errorMessage = err.error || "Erreur lors de l'inscription.";
        },
    });
}}