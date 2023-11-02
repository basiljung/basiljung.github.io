import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './features/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { StandingsComponent } from './features/standings/standings.component';
import { TeamDetailsComponent } from './features/team-details/team-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    StandingsComponent,
    TeamDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
