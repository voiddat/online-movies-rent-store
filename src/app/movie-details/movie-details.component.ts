import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  
  @Input()
  set id(heroId: string) {
    this.hero$ = this.service.getHero(heroId);
  }
}
