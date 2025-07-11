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

interface Injury {
    description: string;
    designation: string;
    injDate: string;
    injReturnDate: string;
}

export interface PlayerInfo {
    age: string;
    birthday: string;
    espnHeadshot: string;
    experience: string;
    gamesPlayed: string;
    height: string;
    injury: Injury;
    isFreeAgent: boolean;
    jerseyNum: string;
    lastGamePlayed: string;
    name: string;
    playerId: string;
    position: string;
    school: string;
    stats: {
        RushingStats: RushingStats;
        ReceivingStats: ReceivingStats;
        PassingStats: PassingStats;
        DefenseStats: DefenseStats;
    }
    teamAbv: string;
    teamID: string;
    weight: string;
}

export interface PlayerInfoProp {
    player: PlayerInfo;
}

export interface PlayerInfoError {

}