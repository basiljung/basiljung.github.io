import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, takeUntil} from 'rxjs';
import { Standing } from 'src/app/models/standing.model';
import { FootballStatsService } from 'src/app/services/football-stats.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit, OnDestroy {
  currentYear = new Date();
  standingData: Standing[] = [];
  private readonly destroy$ = new Subject<void>();
  loading = false;
  leagueId!: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly footballStatsService: FootballStatsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.leagueId = param['id'];
      this.getStadingData(this.leagueId);
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
          finalize(() => (this.loading = false)),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (res) => {
            this.standingData = res.response[0]?.league
              .standings[0] as unknown as Standing[];
            if (this.standingData) {
              localStorage.setItem(id, JSON.stringify(this.standingData));
            }
          },
          error: () => {
            this.router.navigate(['']);
          },
        });
    }
  }

  openDetailPage(teamId: number) {
    this.router.navigate(['details', teamId], {
      queryParams: { leagueId: this.leagueId },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
