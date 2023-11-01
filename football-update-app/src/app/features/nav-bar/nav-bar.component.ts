import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  countries = [
    { countryName: 'england', active: true },
    { countryName: 'spain', active: false },
    { countryName: 'germany', active: false },
    { countryName: 'france', active: false },
    { countryName: 'italy', active: false },
  ];
}
