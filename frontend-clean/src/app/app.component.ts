import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], 
  template: `
    <nav class="bg-gray-800 text-white p-3 flex gap-3">
      <a routerLink="/">Inicio</a>
      <a routerLink="/admin">Admin</a>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/login">Login</a>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {

  constructor(public router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {

    const role = localStorage.getItem('auth');

    // 🔐 SOLO VALIDACIÓN GLOBAL
    if (!role) {
      this.router.navigate(['/login']);
    }
  }
}