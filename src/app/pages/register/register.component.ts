import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { RegisterRequest } from '../../models/RegisterRequest';
import { Router } from '@angular/router';  // <-- Import Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest: RegisterRequest = { nom: '', email: '', motDePasse: '', role: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}  // <-- Inject Router

  onSubmit() {
    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        console.log('Réponse du backend :', response);
        // Redirection vers la page login après succès
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur reçue du backend :', err);
        this.errorMessage = err.error || "Erreur lors de l'inscription.";
      },
    });
  }
}
