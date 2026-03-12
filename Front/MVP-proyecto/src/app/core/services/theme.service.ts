import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeSignal = signal<boolean>(this.loadTheme());

  isDarkMode = this.darkModeSignal.asReadonly();

  toggleTheme() {
    const newValue = !this.darkModeSignal();
    this.darkModeSignal.set(newValue);
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
    this.applyTheme(newValue);
  }

  private applyTheme(isDark: boolean) {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  private loadTheme(): boolean {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  }

  initTheme() {
    this.applyTheme(this.darkModeSignal());
  }
}
