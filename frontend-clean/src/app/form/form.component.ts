import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService, Municipio, TicketResponse } from '../services/ticket.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  municipios: Municipio[] = [];

  form = {
    nombre: '',
    curp: '',
    municipio_id: null,
    turno: null   
  };

    mod = {
    curp: '',
    turno: null,
    nombre: ''
  };

  ticketCreado: TicketResponse | null = null;

  constructor(
    private service: TicketService,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.service.getMunicipios().subscribe(res => {
      this.municipios = res;
    });
  }

  crear() {

    if (!this.validarCURP(this.form.curp)) {
      alert('CURP inválido');
      return;
    }

    this.service.crearTicket(this.form).subscribe(res => {
      window.open('http://127.0.0.1:8000' + res.pdf, '_blank');
    });

  }

  modificar() {

    if (!this.mod.curp || !this.mod.turno || !this.mod.nombre) {
      alert('Llena todos los campos');
      return;
    }

    this.http.put('http://127.0.0.1:8000/api/tickets/update', this.mod)
      .subscribe({
        next: () => {
          alert('Ticket actualizado correctamente');
        },
        error: () => {
          alert('No se encontró el ticket');
        }
      });

  }

  mostrarModificador = false;

  descargarPDF() {

    if (!this.mod.curp || !this.mod.turno) {
      alert('Ingresa CURP y turno');
      return;
    }

    this.http.get<any>(
      `http://127.0.0.1:8000/api/tickets/pdf?curp=${this.mod.curp}&turno=${this.mod.turno}`
    ).subscribe({
      next: (res) => {
        window.open('http://127.0.0.1:8000' + res.pdf, '_blank');
      },
      error: () => {
        alert('No se encontró el PDF');
      }
    });

  }

  previewPDF: SafeResourceUrl | null = null;

  verPreview() {

    this.http.get<any>(
      `http://127.0.0.1:8000/api/tickets/pdf?curp=${this.mod.curp}&turno=${this.mod.turno}`
    ).subscribe(res => {

      const url = 'http://127.0.0.1:8000' + res.pdf;

      this.previewPDF = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    });

  }

    logout() {
      localStorage.removeItem('auth');
      this.router.navigate(['/login']);
    }

    validarCURP(curp: string): boolean {
      const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
      return regex.test(curp);
    }

    irModificar() {
      this.router.navigate(['/modificar']);
    }

}