import { Routes } from '@angular/router';
import { UsersList } from './pages/users-list/users-list';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersList,
  },
];
