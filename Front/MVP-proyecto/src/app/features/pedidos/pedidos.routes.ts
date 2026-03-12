import { Routes } from '@angular/router';
import { PedidosList } from './pages/pedidos-list/pedidos-list';

export const PEDIDOS_ROUTES: Routes = [
  {
    path: '',
    component: PedidosList,
  },
];
