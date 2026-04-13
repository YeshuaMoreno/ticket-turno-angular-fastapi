import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  crearCuenta() {
    if (!this.username || !this.password) {
      alert('Llena usuario y contraseña');
      return;
    }

    this.http.post<any>('http://127.0.0.1:8000/api/register', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Usuario creado correctamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err?.error?.detail || 'Error al crear cuenta');
      }
    });
  }

  volver() {
    this.router.navigate(['/login']);
  }
}