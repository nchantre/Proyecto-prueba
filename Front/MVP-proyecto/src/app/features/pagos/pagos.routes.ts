import { Routes } from '@angular/router';
import { PagosList } from './pages/pagos-list/pagos-list';

export const PAGOS_ROUTES: Routes = [
  {
    path: '',
    component: PagosList,
  },
];
