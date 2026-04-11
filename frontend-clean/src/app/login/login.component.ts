import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="min-h-screen flex items-center justify-center bg-gray-100">

    <div class="bg-white p-8 rounded-2xl shadow-xl w-80 space-y-4">

      <h2 class="text-2xl font-bold text-center"> Login</h2>

      <input [(ngModel)]="username"
        placeholder="Usuario"
        class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">

      <input [(ngModel)]="password"
        type="password"
        placeholder="Contraseña"
        class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">

      <p class="text-center text-sm text-gray-600">
        ¿Cuánto es {{num1}} + {{num2}}?
      </p>

      <input [(ngModel)]="captchaUser"
        type="number"
        placeholder="Respuesta"
        class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">

      <button (click)="login()"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
        Entrar
      </button>

      <button (click)="register()"
        class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition">
        Crear cuenta
      </button>

      <p class="text-center text-sm text-blue-500 cursor-pointer hover:underline"
        (click)="recuperar()">
        ¿Olvidaste tu contraseña?
      </p>

    </div>

  </div>
  `
})
export class LoginComponent {

  username = '';
  password = '';

  num1 = Math.floor(Math.random() * 10);
  num2 = Math.floor(Math.random() * 10);

  captchaUser: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login() {

    if (this.captchaUser !== (this.num1 + this.num2)) {
      alert('Captcha incorrecto');
      return;
    }

    this.http.post<any>('http://127.0.0.1:8000/api/login', {
      username: this.username,
      password: this.password
    }).subscribe({

      next: (res) => {

        localStorage.setItem('auth', res.rol);

        if (res.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }

      },

      error: () => {
        alert('Credenciales incorrectas');
      }

    });

  }

  register() {
    if (!this.username || !this.password) {
      alert('Llena usuario y contraseña');
      return;
    }

    this.http.post('http://127.0.0.1:8000/api/register', {
      username: this.username,
      password: this.password
    }).subscribe(() => {
      alert('Usuario creado');
    });
  }

  recuperar() {
    alert('Contacta al administrador');
  }
}