import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StandingsComponent } from './features/standings/standings.component';
import { TeamDetailsComponent } from './features/team-details/team-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'league/:id', component: StandingsComponent }],
  },
  { path: 'details/:teamId', component: TeamDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
