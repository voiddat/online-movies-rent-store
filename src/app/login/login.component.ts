import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginPayload } from '../models/login.models';
import { AuthService } from '../services/auth.service';
import { StateService } from '../services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatCardModule, MatButtonModule, CommonModule, FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  model: LoginPayload = { username: '', password: '' };

  onSubmit() {
    this.authService.login$(this.model).subscribe(({ access }) => { !this.authService.isAdmin(access) ? this.router.navigate(['']) : this.router.navigateByUrl('/rentals') });
  }
}
