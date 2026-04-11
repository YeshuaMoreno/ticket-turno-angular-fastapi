import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  template: `
  <nav class="flex flex-wrap gap-2">

    <div class="font-bold">🎟 Ticket Turno</div>

    <div class="flex gap-3">

      <a routerLink="/" class="hover:underline">Inicio</a>

      <a *ngIf="role==='admin'" routerLink="/admin" class="hover:underline">
        Admin
      </a>

      <a *ngIf="role==='admin'" routerLink="/dashboard" class="hover:underline">
        Dashboard
      </a>

      <a *ngIf="role==='admin'" routerLink="/usuarios" class="hover:underline">
        Usuarios
      </a>

      <button (click)="logout()" class="bg-red-500 px-2 rounded">
        Salir
      </button>

    </div>

  </nav>
  `
})
export class NavbarComponent {

  role = localStorage.getItem('auth');

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}