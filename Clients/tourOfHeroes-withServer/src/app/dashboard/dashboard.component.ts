import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        let json = heroes;
        this.heroes = [];
        Object.keys(json).forEach(
          (key) => {
            this.heroes.push(new Hero(json[key].id,json[key].name));
          });
          this.heroes = this.heroes.slice(1,5);
      });
  }
}