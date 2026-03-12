import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { UsersList } from './features/users/pages/users-list/users-list';
import { PedidosList } from './features/pedidos/pages/pedidos-list/pedidos-list';
import { PagosList } from './features/pagos/pages/pagos-list/pagos-list';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'users',
    component: UsersList,
    canActivate: [authGuard]
  },
  {
    path: 'pedidos',
    component: PedidosList,
    canActivate: [authGuard]
  },
  {
    path: 'pagos',
    component: PagosList,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
