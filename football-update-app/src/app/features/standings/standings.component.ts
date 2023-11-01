import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, finalize, map, takeUntil, tap } from 'rxjs';
import { Standing } from 'src/app/models/standing.model';
import { FootballStatsService } from 'src/app/services/football-stats.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit, OnDestroy {
  currentYear = new Date();
  standingData:Standing[] = [];
  private readonly destroy$ = new Subject<void>();
  loading = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly footballStatsService: FootballStatsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.getStadingData(param['id']);
    });
  }

  private getStadingData(id: string) {
    if (localStorage.getItem(id)) {
      this.standingData = JSON.parse(localStorage.getItem(id) as string);
    } else {
      this.loading = true;
      this.footballStatsService
        .getLeagueStandings(+id, this.currentYear.getFullYear())
        .pipe(
          map((res) => {
            return res.response[0].league.standings[0] as unknown as Standing[];
          }),
          tap((res) => {
            localStorage.setItem(id, JSON.stringify(res));
          }),
          finalize(() => (this.loading = false)),
          takeUntil(this.destroy$)
        )
        .subscribe((res) => {
          this.standingData = res;
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
