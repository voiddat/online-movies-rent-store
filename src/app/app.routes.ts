import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ProfileComponent } from './profile/profile.component';
import { RentalsComponent } from './rentals/rentals.component';
import { LogoutComponent } from './logout/logout.component';
import { NewMovieComponent } from './admin/new-movie/new-movie.component';
import { BubbleChartComponent } from './admin/bubble-chart/bubble-chart.component';

export const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'movie_details/:uuid', component: MovieDetailsComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'rentals', component: RentalsComponent },
{ path: 'logout', component: LogoutComponent },
{
    path: 'admin', children: [
        { path: 'new-movie', component: NewMovieComponent },
        { path: 'bubble-chart', component: BubbleChartComponent }
    ]
}
];
