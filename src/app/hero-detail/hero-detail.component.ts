import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  
  @Input() hero?: Hero;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) { }

  getHero():void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe( hero => this.hero = hero );
  }

  ngOnInit(): void {
    this.getHero();
  }

  goBack():void {
    this.location.back();
  }

  save():void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe( () => this.goBack() );
    }
  }
}
