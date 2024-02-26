import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AuthService } from './services/auth.service';
import { Observable, combineLatest, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LoginComponent, MatTabsModule]
})
export class AppComponent {
  isAdmin$ = this.authService.isAdmin$;
  isLoggedIn$ = this.authService.isLoggedIn$;
  navLinks$ = combineLatest([this.isAdmin$, this.isLoggedIn$]).pipe(
    map(([isAdmin, isLoggedIn]) => {
      const navLinks = isAdmin ? this.adminNavLinks : this.userNavLinks;
      const loginLogout = this.getLoginLogoutButton(isLoggedIn);
      const navLinksCopy = navLinks.slice()
      navLinksCopy.push(loginLogout);
      return navLinksCopy;
    }))

  constructor(private authService: AuthService) { }

  private userNavLinks = [{ path: '/dashboard', label: 'Home' },
  { path: '/rentals', label: 'Rentals' },
  { path: '/profile', label: 'Profile' },
  ]

  private adminNavLinks = [
    { path: '/rentals', label: 'Users rentals' },
    { path: '/admin/new-movie', label: 'Add new movie' },
    { path: '/admin/bubble-chart', label: 'Bubble chart' },
  ]
  title = 'online-movies-rent-store';

  private getLoginLogoutButton(isLoggedIn: boolean): { path: string, label: string } {
    return isLoggedIn ? { path: '/logout', label: 'Logout' } : { path: '/login', label: 'Login' }
  }
}
