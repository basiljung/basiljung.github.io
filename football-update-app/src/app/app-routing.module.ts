import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StandingsComponent } from './features/standings/standings.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'league/:id', component: StandingsComponent }],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
