import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketService } from '../services/ticket.service';

@Component({
  standalone: true,
  selector: 'app-admin-municipios',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="max-w-4xl mx-auto p-4 space-y-4">

    <h2 class="text-xl font-bold">📂 Catálogo de Municipios</h2>

    <button routerLink="/admin"
            class="bg-gray-500 text-white px-3 py-2 rounded">
      ← Volver
    </button>

    <div class="flex gap-2">
      <input [(ngModel)]="nuevoMunicipio"
             placeholder="Nuevo municipio"
             class="border p-1 w-full">

      <button (click)="crearMunicipio()"
              class="bg-green-500 text-white px-2">
        Agregar
      </button>
    </div>

    <div *ngFor="let m of municipios" class="flex gap-2 mt-2">

      <input [(ngModel)]="m.nombre"
             class="border p-1 w-full">

      <button (click)="editarMunicipio(m)"
              class="bg-yellow-500 text-white px-2">
        Editar
      </button>

      <button (click)="eliminarMunicipio(m.id)"
              class="bg-red-500 text-white px-2">
        X
      </button>

    </div>

  </div>
  `
})
export class AdminMunicipiosComponent implements OnInit {

  municipios: any[] = [];
  nuevoMunicipio = '';

  constructor(private service: TicketService) {}

  ngOnInit(): void {
    this.cargarMunicipios();
  }

  cargarMunicipios() {
    this.service.getMunicipios().subscribe(res => {
      this.municipios = res;
    });
  }

  crearMunicipio() {
    if (!this.nuevoMunicipio.trim()) return;

    this.service.crearMunicipio(this.nuevoMunicipio)
      .subscribe(() => {
        this.nuevoMunicipio = '';
        this.cargarMunicipios();
      });
  }

  editarMunicipio(m: any) {
    this.service.editarMunicipio(m.id, m.nombre)
      .subscribe(() => this.cargarMunicipios());
  }

  eliminarMunicipio(id: number) {
    this.service.eliminarMunicipio(id)
      .subscribe(() => this.cargarMunicipios());
  }
}