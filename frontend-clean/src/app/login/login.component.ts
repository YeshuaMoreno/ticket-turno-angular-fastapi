import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  num1 = Math.floor(Math.random() * 10);
  num2 = Math.floor(Math.random() * 10);

  captchaUser: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (this.captchaUser !== this.num1 + this.num2) {
      alert('Captcha incorrecto');
      return;
    }

    if (!this.username || !this.password) {
      alert('Llena usuario y contraseña');
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

  recuperar() {
    alert('Contacta al administrador');
  }
}