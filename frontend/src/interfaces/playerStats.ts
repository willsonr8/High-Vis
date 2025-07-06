export interface SnapCounts {
  defSnap: string;
  defSnapPct: string;
  offSnap: string;
  offSnapPct: string;
  stSnap: string;
  stSnapPct: string;
}

export interface ReceivingStats {
  receptions: string;
  recTD: string;
  longRec: string;
  targets: string;
  recYds: string;
  recAvg?: string;
  recTwoPointConversions?: string;
}

export interface RushingStats {
  rushAvg?: string;
  rushYds: string;
  carries: string;
  longRush?: string;
  rushTD: string;
  rushTwoPointConversions?: string;
}

export interface DefenseStats {
  fumblesLost?: string;
  defensiveInterceptions: string;
  forcedFumbles?: string;
  fumbles: string;
  fumblesRecovered?: string;
  totalTackles?: string;
  defTD: string;
  soloTackles?: string;
  tfl?: string;
  qbHits?: string;
  sacks?: string;
  passDeflections?: string;
  twoPointConversionReturns?: string;
}

export interface PassingStats {
  passYds: string;
  passTD: string;
  passInt: string;
  passCmp: string;
  passAtt: string;
  longPass?: string;
  passRating?: string;
  passTwoPointConversions?: string;
}

export interface ScoringPlay {
  score: string;
  scorePeriod: string;
  homeScore: string;
  awayScore: string;
  teamID: string;
  scoreDetails: string;
  scoreType: string;
  scoreTime: string;
  team: string;
  playerIDs: string[];
}

export interface FantasyPoints {
  standard: string;
  PPR: string;
  halfPPR: string;
}

export interface GameStats {
    playerID: string;
    playerName: string;
    teamAbvAway: string;
    teamIDAway: string;
    awayPoints?: string;
    awayResult?: string;
    encodedGameWeek?: string;
    gameDate: string;
    gameID: string;
    gameStatus: string;
    gameStatusCode: string;
    gameTimeEpoch?: string;
    gameTime?: string;
    gameWeek: string;
    teamAbvHome: string;
    teamIDHome: string;
    homePoints?: string;
    homeResult?: string;
    season: string;
    seasonType: string;
    snapCounts: SnapCounts;
    Passing?: PassingStats;
    Receiving?: ReceivingStats;
    Rushing?: RushingStats;
    Defense?: DefenseStats;
    fantasyPoints: FantasyPoints;
}

export interface PlayerStats {
    games: GameStats[];
    playerID: string;
    season: string;
}