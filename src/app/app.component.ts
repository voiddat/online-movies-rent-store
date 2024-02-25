import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LoginComponent, MatTabsModule]
})
export class AppComponent {
  navLinks = [{ path: '/dashboard', label: 'Home' }, { path: '/login', label: 'Login' }]
  title = 'online-movies-rent-store';
}
