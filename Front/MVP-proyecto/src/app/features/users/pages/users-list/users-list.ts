import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, User } from '../../../../core/services/api.service';
import { Navbar } from '../../../../layout/navbar/navbar';
import { Sidebar } from '../../../../layout/sidebar/sidebar';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, Navbar, Sidebar],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList implements OnInit {
  private apiService = inject(ApiService);

  users: User[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error cargando los usuarios';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
