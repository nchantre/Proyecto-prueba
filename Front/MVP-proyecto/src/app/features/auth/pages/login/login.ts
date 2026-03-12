import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  username = signal('');
  error = signal('');

  login() {
    const trimmedUsername = this.username().trim();
    
    if (!trimmedUsername) {
      this.error.set('Por favor ingresa un usuario');
      return;
    }

    if (!this.auth.isValidUser(trimmedUsername)) {
      this.error.set('Usuario no válido. Solo se permiten: admin o user');
      return;
    }
    
    const loginSuccess = this.auth.login(trimmedUsername);
    if (loginSuccess) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error.set('Error al iniciar sesión. Intenta de nuevo.');
    }
  }

  setUsername(value: string) {
    this.username.set(value);
    if (this.error()) this.error.set('');
  }
}
