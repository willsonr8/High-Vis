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
  passAvg: string;
  qbr?: string;
  rtg?: string;
  sacked?: string
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
  standard?: string;
  PPR?: string;
  halfPPR?: string;
}

export interface GameStats {
    playerId: string;
    playerName: string;
    teamAbvAway: string;
    teamIDAway: string;
    awayPoints?: string;
    awayResult?: string;
    encodedGameWeek?: string;
    gameDate: string;
    gameId: string;
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
    fantasyPoints?: FantasyPoints;
}

export interface PlayerStats {
    games: GameStats[];
    playerId: string;
    season: string;
}

export function NewPlayerStats(r: any) {
    const nps: PlayerStats = {
        games: [],
        playerId: "",
        season: ""
    }
    if (!("games" in r) || !("playerId" in r) || !("season" in r)) {
        return nps
    }
    nps.playerId = r.playerId
    nps.season = r.season

    //console.log("loading player games: ", r.games)
    for (const game of r.games) {
        //console.log("loading snap counts: ", game.stats.snapCount)
        const newSnapCount: SnapCounts = {
            defSnap: game.stats.snapCount.defSnap,
            defSnapPct: game.stats.snapCount.defSnap,
            offSnap: game.stats.snapCount.offSnap,
            offSnapPct: game.stats.snapCount.offSnapPct,
            stSnap: game.stats.snapCount.stSnap,
            stSnapPct: game.stats.snapCount.stSnapPct
        }
        //console.log("loading passing stats: ", game.stats.stats.passingStats)
        const newPassing: PassingStats = {
            passYds: game.stats.stats.passingStats.passYds,
            passTD: game.stats.stats.passingStats.passTD,
            passInt: game.stats.stats.passingStats.int,
            passCmp: game.stats.stats.passingStats.passCompletions,
            passAtt: game.stats.stats.passingStats.passAttempts,
            longPass: game.stats.stats.passingStats.longPass,
            passRating: game.stats.stats.passingStats.passYds,
            passTwoPointConversions: game.stats.stats.passingStats.passTwoPointConversions,  // this might be wrong field
            passAvg: game.stats.stats.passingStats.passAvg,
            qbr: game.stats.stats.passingStats.qbr,
            rtg: game.stats.stats.passingStats.rtg,
            sacked: game.stats.stats.passingStats.sacked
        }
        //console.log("loading rushing stats: ", game.stats.stats.rushingStats)
        const newRushing: RushingStats = {  // need value population
            rushAvg: game.stats.stats.rushingStats.rushAvg,
            rushYds: game.stats.stats.rushingStats.rushYds,
            carries: game.stats.stats.rushingStats.carries,
            longRush: game.stats.stats.rushingStats.longRush,
            rushTD: game.stats.stats.rushingStats.rushTD,
            rushTwoPointConversions: game.stats.stats.rushingStats.rushTwoPointConversions
        }
        //console.log("loading receiving stats: ", game.stats.stats.receivingStats)
        const newReceiving: ReceivingStats = {
            receptions: game.stats.stats.receivingStats.receptions,
            recTD: game.stats.stats.receivingStats.recTD,
            longRec: game.stats.stats.receivingStats.longRec,
            targets: game.stats.stats.receivingStats.targets,
            recYds: game.stats.stats.receivingStats.recYds,
            recAvg: game.stats.stats.receivingStats.recAvg,
            recTwoPointConversions: game.stats.stats.receivingStats.recTwoPointConversions // ?
        }
        //console.log("loading defense stats: ", game.stats.stats.defensiveStats)
        const newDefense: DefenseStats = {
            fumblesLost: game.stats.stats.defensiveStats.fumblesLost,
            defensiveInterceptions: game.stats.stats.defensiveStats.defensiveInterceptions,
            forcedFumbles: game.stats.stats.defensiveStats.forcedFumbles,
            fumbles: game.stats.stats.defensiveStats.fumbles,
            fumblesRecovered: game.stats.stats.defensiveStats.fumblesRecovered,
            totalTackles: game.stats.stats.defensiveStats.totalTackles,
            defTD: game.stats.stats.defensiveStats.defTD,
            soloTackles: game.stats.stats.defensiveStats.soloTackles,
            tfl: game.stats.stats.defensiveStats.tfl,
            passDeflections: game.stats.stats.defensiveStats.passDeflections,
            sacks: game.stats.stats.defensiveStats.sacks,
            qbHits: game.stats.stats.defensiveStats.qbHits,
            twoPointConversionReturns: game.stats.stats.twoPointConversionReturns
        }
        //console.log("showing stats: ", game.stats)
        //console.log("loading fantasy stats: ", game.stats.fantasyPoints)
        const newFantasyPoints: FantasyPoints = {
            // standard: game.stats.fantasyPoints.standard,
            // PPR: game.stats.fantasyPoints.PPR,
            // halfPPR: game.stats.fantasyPoints.halfPPR
            standard: "",
            PPR: "",
            halfPPR: ""
        }

        const newGame: GameStats = {
            playerId: game.stats.playerId,
            playerName: game.stats.playerName,
            teamAbvAway: game.awayTeam,
            teamIDAway: game.awayID,
            awayPoints: game.awayPoints,
            awayResult: game.awayResult,
            encodedGameWeek: game.encodedGameWeek,
            gameDate: game.gameDate,
            gameId: game.gameId,
            gameStatus: game.gameStatus,
            gameStatusCode: game.gameStatusCode,
            gameTimeEpoch: game.gameTimeEpoch,
            gameTime: game.gameTime,
            gameWeek: game.gameWeek,
            teamAbvHome: game.homeTeam,
            teamIDHome: game.homeId,
            homePoints: game.homePoints,
            homeResult: game.homeResult,
            season: game.season,
            seasonType: game.seasonType,
            snapCounts: newSnapCount,
            Passing: newPassing,
            Receiving: newReceiving,
            Rushing: newRushing,
            Defense: newDefense,
            fantasyPoints: newFantasyPoints,
        }
        nps.games.push(newGame)
    }

    return nps
}