import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { of } from 'rxjs';
import { RouterTestingModule } from "@angular/router/testing";


describe('AppComponent', () => {
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAdmin$', 'isLoggedIn$']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'online-movies-rent-store' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('online-movies-rent-store');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Online Movies Rent Store');
  });

  it('should create correct navlinks for admin', () => {
    authServiceSpy.isAdmin$ = of(true);
    authServiceSpy.isLoggedIn$ = of(true);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.mdc-tab__text-label')[0]?.textContent?.trim()).toContain('Users rentals')
    expect(compiled.querySelectorAll('.mdc-tab__text-label')[1]?.textContent).toContain('Add new movie')
    expect(compiled.querySelectorAll('.mdc-tab__text-label')[2]?.textContent).toContain('Bubble chart')
    expect(compiled.querySelectorAll('.mdc-tab__text-label')[3]?.textContent).toContain('Logout')
  })
});
