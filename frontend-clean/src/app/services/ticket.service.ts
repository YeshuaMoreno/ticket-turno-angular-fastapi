import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Municipio {
  id: number;
  nombre: string;
}

export interface Ticket {
  id: number;
  nombre: string;
  curp: string;
  municipio_id: number;
  turno: number;
  estatus: string;
}

export interface TicketResponse {
  mensaje: string;
  turno: number;
  pdf: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private api = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.api}/municipios`);
  }

  crearTicket(data: any): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(`${this.api}/tickets`, data);
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.api}/tickets`);
  }

  deleteTicket(id: number) {
    return this.http.delete(`${this.api}/tickets/${id}`);
  }

  cambiarEstatus(id: number, estatus: string) {
    return this.http.put(`${this.api}/tickets/${id}`, { estatus });
  }

  crearMunicipio(nombre: string) {
    return this.http.post('http://127.0.0.1:8000/api/municipios?nombre=' + nombre, {});
  }

  editarMunicipio(id: number, nombre: string) {
    return this.http.put(
      `http://127.0.0.1:8000/api/municipios/${id}?nombre=${nombre}`,
      {}
    );
  }

  eliminarMunicipio(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/municipios/${id}`);
  }

}