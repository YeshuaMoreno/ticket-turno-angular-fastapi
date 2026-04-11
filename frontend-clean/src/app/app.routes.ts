import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', component: FormComponent },

  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'usuarios', loadComponent: () =>
      import('./admin-usuarios/admin-usuarios.component')
      .then(m => m.AdminUsuariosComponent),
      canActivate: [AuthGuard]
  },

  { path: 'municipios', loadComponent: () =>
      import('./admin-municipios/admin-municipios.component')
      .then(m => m.AdminMunicipiosComponent),
      canActivate: [AuthGuard]
  }
];