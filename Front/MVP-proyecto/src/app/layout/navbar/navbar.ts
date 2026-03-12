import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../features/auth/services/auth';
import { ThemeService } from '../../core/services/theme.service';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private auth = inject(Auth);
  private router = inject(Router);
  themeService = inject(ThemeService);
  layout = inject(LayoutService);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.layout.toggleSidebar();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return (this.themeService.isDarkMode() as unknown as boolean) || false;
  }
}
