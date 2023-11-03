import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, map, takeUntil, tap } from 'rxjs';
import { FootballStatsService } from 'src/app/services/football-stats.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
})
export class TeamDetailsComponent implements OnInit, OnDestroy {
  currentYear = new Date();
  teamId!: number;
  leagueId!: number;
  fixtureData: any[] = [];
  loading = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly footballStatsService: FootballStatsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['teamId'];
    this.leagueId = this.route.snapshot.queryParams['leagueId'];
    this.loading = true;
    this.footballStatsService
      .getLeagueFixtures(this.teamId, this.currentYear.getFullYear())
      .pipe(
        map((res) => {
          return res.response;
        }),
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (res) => {
          this.fixtureData = res;
        },
        error: () => {
          this.router.navigate(['league', this.leagueId]);
        },
      });
  }

  returnBack() {
    this.router.navigate(['league', this.leagueId]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
