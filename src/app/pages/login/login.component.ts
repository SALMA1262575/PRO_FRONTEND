import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { LoginRequest } from '../../models/LoginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest = { email: '', motDePasse: '' };
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        // ✅ On reçoit un token depuis le backend
        const token = response.token;

        // ✅ On sauvegarde le token dans localStorage
        localStorage.setItem('token', token);

        // ✅ On redirige vers /home → qui gère la suite
        this.router.navigate(['/home']); // 🔥 Cette ligne te manquait
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

 
