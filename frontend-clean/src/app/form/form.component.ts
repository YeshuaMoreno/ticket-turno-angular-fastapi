import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService, Municipio, TicketResponse } from '../services/ticket.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  ticketCreado: TicketResponse | null = null;

  constructor(
    private service: TicketService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.service.getMunicipios().subscribe(res => {
      this.municipios = res;
    });
  }

  crear() {
    this.service.crearTicket(this.form).subscribe(res => {

      // SOLO abre el PDF
      window.open('http://127.0.0.1:8000' + res.pdf, '_blank');

    });
  }

  modificar() {

    console.log(this.form); 

    this.http.put('http://127.0.0.1:8000/api/tickets/update', this.form)
      .subscribe({
        next: () => alert('Ticket actualizado'),
        error: err => console.log(err) 
      });
  }

    logout() {
      localStorage.removeItem('auth');
      this.router.navigate(['/login']);
    }

}