import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { FootballStatsService } from 'src/app/services/football-stats.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
})
export class TeamDetailsComponent implements OnInit {
  currentYear = new Date();
  teamId!: number;
  leagueId!: number;

  constructor(
    private readonly footballStatsService: FootballStatsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['teamId'];
    this.leagueId = this.route.snapshot.queryParams['leagueId'];
    this.footballStatsService
      .getLeagueFixtures(this.teamId, this.currentYear.getFullYear())
      .pipe(tap((res) => {}))
      .subscribe((res) => {
        console.log(res);
      });
  }

  returnBack() {
    this.router.navigate(['league', this.leagueId]);
  }
}
