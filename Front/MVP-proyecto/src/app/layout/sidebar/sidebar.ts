import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../features/auth/services/auth';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  private auth = inject(Auth);
  layout: LayoutService = inject(LayoutService);
  role: string | null = null;
  isOpen = false;

  menu = [
    { title: 'Dashboard', route: '/dashboard', roles: ['admin', 'user'] },
    { title: 'Users', route: '/users', roles: ['admin', 'user'] },
    { title: 'Pedidos', route: '/pedidos', roles: ['admin', 'user'] },
    { title: 'Pagos', route: '/pagos', roles: ['admin'] },
    //{ title: 'Configuracion', route: '/config', roles: ['admin'] }
  ];

  ngOnInit() {
    this.role = this.auth.getRole();
    this.layout.sidebarOpen$.subscribe((open: boolean) => (this.isOpen = open));
  }
}
