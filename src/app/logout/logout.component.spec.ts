import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { AuthService } from '../services/auth.service';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;


  const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
