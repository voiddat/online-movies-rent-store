import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceSpy = jasmine.createSpyObj('AuthService', ['post', 'get']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, BrowserAnimationsModule],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
