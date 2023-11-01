import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StandingLeagueData } from '../models/standing.model';

@Injectable({
  providedIn: 'root',
})
export class FootballStatsService {
  private apiKey = '7e7df12f91414c05cce3460abdb9b2a2';

  constructor(private readonly http: HttpClient) {}

  getLeagueStandings(
    league: number,
    season: number
  ): Observable<StandingLeagueData> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey,
    });
    return this.http.get<StandingLeagueData>(
      'https://v3.football.api-sports.io/standings',
      {
        headers,
        params: {
          league,
          season,
        },
      }
    );
  }
}
