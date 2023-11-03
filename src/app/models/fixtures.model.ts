export interface FixtureLeagueData {
  get: string;
  parameters: Parameters;
  errors: any[];
  results: number;
  paging: Paging;
  response: Response[];
}

export interface Paging {
  current: number;
  total: number;
}

export interface Parameters {
  team: string;
  season: string;
  last: string;
}

export interface Response {
  fixture: Fixture;
  league: League;
  teams: Teams;
  goals: Goals;
  score: Score;
}

export interface Fixture {
  id: number;
  referee: string;
  timezone: Timezone;
  date: Date;
  timestamp: number;
  periods: Periods;
  venue: Venue;
  status: Status;
}

export interface Periods {
  first: number;
  second: number;
}

export interface Status {
  long: Long;
  short: Short;
  elapsed: number;
}

export enum Long {
  MatchFinished = 'Match Finished',
}

export enum Short {
  Ft = 'FT',
  Pen = 'PEN',
}

export enum Timezone {
  UTC = 'UTC',
}

export interface Venue {
  id: number;
  name: string;
  city: string;
}

export interface Goals {
  home: number | null;
  away: number | null;
}

export interface League {
  id: number;
  name: Name;
  country: Country;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

export enum Country {
  England = 'England',
  Germany = 'Germany',
  Italy = 'Italy',
  France = 'France',
  Spain = 'Spain',
}

export enum Name {
  PremierLeague = 'Premier League',
  SerieA = 'Serie A',
  LaLiga = 'La Liga',
  Bundesliga = 'Bundesliga',
  Ligue1 = 'Ligue 1',
}

export interface Score {
  halftime: Goals;
  fulltime: Goals;
  extratime: Goals;
  penalty: Goals;
}

export interface Teams {
  home: Away;
  away: Away;
}

export interface Away {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}
