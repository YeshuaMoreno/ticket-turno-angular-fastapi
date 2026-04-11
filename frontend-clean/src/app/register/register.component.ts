import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  template: `
  <div class="max-w-md mx-auto mt-20 p-6 border rounded shadow">

    <h2 class="text-2xl font-bold mb-4 text-center">
      📝 Registro Usuario
    </h2>

    <input [(ngModel)]="usuario" placeholder="Usuario"
      class="w-full border p-2 mb-3 rounded">

    <input [(ngModel)]="password" type="password" placeholder="Contraseña"
      class="w-full border p-2 mb-3 rounded">

    <button (click)="registrar()"
      class="w-full bg-green-500 text-white py-2 rounded">
      Registrarse
    </button>

  </div>
  `
})
export class RegisterComponent {

  usuario = '';
  password = '';

  constructor(private router: Router) {}

  registrar() {

    fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.usuario,
        password: this.password
      })
    })
    .then(res => res.json())
    .then(() => {
      alert('Usuario registrado');
      this.router.navigate(['/login']);
    })
    .catch(() => alert('Error'));
  }
}