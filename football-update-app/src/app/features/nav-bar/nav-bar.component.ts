import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  countries = [
    { countryName: 'england', id: 39, active: false },
    { countryName: 'spain', id: 140, active: false },
    { countryName: 'germany', id: 78, active: false },
    { countryName: 'france', id: 61, active: false },
    { countryName: 'italy', id: 135, active: false },
  ];

  constructor(private readonly router: Router) {}

  onLeagueSelect(id: number) {
    this.countries.map((element) => {
      element.active = false;
      if (element.id === id) {
        element.active = true;
      }
      return element;
    });

    this.router.navigate(['league', id]);
  }
}
