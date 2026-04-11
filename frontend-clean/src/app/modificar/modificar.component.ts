import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modificar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modificar.component.html'
})
export class ModificarComponent {

  mod = {
    curp: '',
    turno: null as number | null,
    nombre: ''
  };

  previewPDF: SafeResourceUrl | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  modificar() {
    this.http.put<any>(
      'http://127.0.0.1:8000/api/tickets/update',
      this.mod
    ).subscribe({
      next: () => alert('Ticket actualizado'),
      error: () => alert('No encontrado')
    });
  }

  descargarPDF() {
    this.http.get<any>(
      `http://127.0.0.1:8000/api/tickets/pdf?curp=${this.mod.curp}&turno=${this.mod.turno}`
    ).subscribe(res => {
      window.open('http://127.0.0.1:8000' + res.pdf);
    });
  }

  verPreview() {
    this.http.get<any>(
      `http://127.0.0.1:8000/api/tickets/pdf?curp=${this.mod.curp}&turno=${this.mod.turno}`
    ).subscribe(res => {
      const url = 'http://127.0.0.1:8000' + res.pdf;
      this.previewPDF = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  volver() {
    this.router.navigate(['/']);
  }
}