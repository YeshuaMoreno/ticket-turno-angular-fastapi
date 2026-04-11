import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TicketService, Ticket } from '../services/ticket.service';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="max-w-5xl mx-auto p-4 space-y-6">

    <h2 class="text-2xl font-bold text-center">Panel Admin</h2>

    <div class="flex gap-2">
      <button routerLink="/dashboard" class="bg-blue-500 text-white px-3 py-2 rounded">
        📊 Dashboard
      </button>

      <button routerLink="/usuarios" class="bg-purple-500 text-white px-3 py-2 rounded">
        👥 Usuarios
      </button>

      <button routerLink="/municipios" class="bg-yellow-500 text-white px-3 py-2 rounded">
        📂 Municipios
      </button>

      <button (click)="logout()" class="bg-red-500 text-white px-3 py-2 rounded">
        Cerrar sesión
      </button>
    </div>

    <input [(ngModel)]="busqueda"
           placeholder="Buscar por CURP o nombre"
           class="w-full border p-2 rounded">

    <table class="w-full border text-sm mt-4">
      <thead class="bg-gray-200">
        <tr>
          <th>Nombre</th>
          <th>CURP</th>
          <th>Turno</th>
          <th>Estatus</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let t of filtrados()" class="text-center">
          <td>{{ t.nombre }}</td>
          <td>{{ t.curp }}</td>
          <td>{{ t.turno }}</td>
          <td>{{ t.estatus }}</td>
          <td>

            <button (click)="eliminar(t.id)" class="text-red-500">
              Eliminar
            </button>

            <!-- 🔥 CORREGIDO AQUÍ -->
            <button (click)="cambiarEstatus(t.id, 'Resuelto')" class="text-green-600">
              Resolver
            </button>

          </td>
        </tr>
      </tbody>
    </table>

  </div>
  `
})
export class AdminComponent implements OnInit {

  tickets: Ticket[] = [];
  busqueda = '';

  constructor(
    private service: TicketService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {

    const role = localStorage.getItem('auth');

    if (role !== 'admin') {
      alert('No tienes permisos');
      this.router.navigate(['/']);
      return;
    }

    this.cargarTickets();
  }

  cargarTickets() {
    this.service.getTickets().subscribe(res => {
      this.tickets = res;
    });
  }

  filtrados() {
    return this.tickets.filter(t =>
      t.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      t.curp.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  cambiarEstatus(id: number, estatus: string) {
    this.http.put(
      `http://127.0.0.1:8000/api/tickets/status/${id}?estatus=${estatus}`,
      {}
    ).subscribe(() => {
      this.cargarTickets();
    });
  }

  eliminar(id: number) {
    this.http.delete(
      `http://127.0.0.1:8000/api/tickets/${id}`
    ).subscribe(() => {
      this.cargarTickets();
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}