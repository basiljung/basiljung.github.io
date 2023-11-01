import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Standing } from 'src/app/models/standing.model';
import { FootballStatsService } from 'src/app/services/football-stats.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit, OnDestroy {
  currentYear = new Date();
  standingData = new Array<Standing[]>();
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly footballStatsService: FootballStatsService) {}

  ngOnInit(): void {
    /*
  england: 39
  spain: 140
  germany: 78
  italy: 135
  France: 61
  */

    if (localStorage.getItem('39')) {
      this.standingData = JSON.parse(localStorage.getItem('39') as string)[0];
    } else {
      this.footballStatsService
        .getLeagueStandings(39, this.currentYear.getFullYear())
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          this.standingData = res.response[0].league.standings;
          localStorage.setItem('39', JSON.stringify(this.standingData));
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
