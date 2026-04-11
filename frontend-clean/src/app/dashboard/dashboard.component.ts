import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  data = {
    total: 0,
    pendientes: 0,
    resueltos: 0
  };

  municipios: any[] = [];
  municipio_id: number | null = null;

  chart: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  volver() {
    this.router.navigate(['/admin']);
  }
  ngOnInit() {

    const role = localStorage.getItem('auth');

    if (role !== 'admin') {
      window.location.href = '/';
      return;
    }

    this.cargarMunicipios();
    this.municipio_id = null;
    this.cargarDatos();
  }

  cargarMunicipios() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/municipios')
      .subscribe(res => this.municipios = res);
  }

  cargarDatos() {

    let url = 'http://127.0.0.1:8000/api/dashboard';

    if (this.municipio_id) {
      url += `?municipio_id=${this.municipio_id}`;
    }

    this.http.get<any>(url)
      .subscribe(res => {
        this.data = res;
        this.renderChart();
      });
  }

  renderChart() {

    const canvas: any = document.getElementById('grafica');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new (window as any).Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Pendientes', 'Resueltos'],
        datasets: [{
          data: [this.data.pendientes, this.data.resueltos]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}