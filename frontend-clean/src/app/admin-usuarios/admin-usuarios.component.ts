import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin-usuarios',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="max-w-4xl mx-auto p-4 space-y-4">

    <h2 class="text-xl font-bold">👥 Gestión de Usuarios</h2>

    <button routerLink="/admin"
            class="bg-gray-500 text-white px-3 py-2 rounded">
      ← Volver
    </button>

    <div class="flex gap-2">
      <input [(ngModel)]="nuevo.username" placeholder="Usuario" class="border p-1">
      <input [(ngModel)]="nuevo.password" placeholder="Password" class="border p-1">
      <button (click)="crear()" class="bg-green-500 text-white px-2">
        Crear
      </button>
    </div>

    <table class="w-full border mt-4">
      <tr>
        <th>ID</th>
        <th>Usuario</th>
        <th>Rol</th>
        <th>Acciones</th>
      </tr>

      <tr *ngFor="let u of usuarios">
        <td>{{ u.id }}</td>
        <td>{{ u.username }}</td>

        <td>
          <select [(ngModel)]="u.rol" (change)="cambiarRol(u)">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </td>

        <td>
          <button (click)="eliminar(u.id)" class="bg-red-500 text-white px-2">
            Eliminar
          </button>
        </td>
      </tr>
    </table>

  </div>
  `
})
export class AdminUsuariosComponent implements OnInit {

  usuarios: any[] = [];

  nuevo = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/usuarios')
      .subscribe(res => this.usuarios = res);
  }

  crear() {
    this.http.post('http://127.0.0.1:8000/api/usuarios', this.nuevo)
      .subscribe(() => {
        this.nuevo = { username: '', password: '' };
        this.cargar();
      });
  }

  cambiarRol(u: any) {
    this.http.put('http://127.0.0.1:8000/api/usuarios', {
      id: u.id,
      rol: u.rol
    }).subscribe(() => this.cargar());
  }

  eliminar(id: number) {
    this.http.delete(`http://127.0.0.1:8000/api/usuarios/${id}`)
      .subscribe(() => this.cargar());
  }
}