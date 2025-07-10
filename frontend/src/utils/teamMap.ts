const teamMap = {
    ARI: "cardinals",
    ATL: "falcons",
    BAL: "ravens",
    BUF: "bills",
    CAR: "panthers",
    CHI: "bears",
    CIN: "bengals",
    CLE: "browns",
    DAL: "cowboys",
    DEN: "broncos",
    DET: "lions",
    GB: "packers",
    HOU: "texans",
    IND: "colts",
    JAX: "jaguars",
    KC: "chiefs",
    LAC: "chargers",
    LAR: "rams",
    LV: "raiders",
    MIA: "dolphins",
    MIN: "vikings",
    NO: "saints",
    NYG: "giants",
    NYJ: "jets",
    PHI: "eagles",
    PIT: "steelers",
    SEA: "seahawks",
    SF: "49ers",
    TB: "buccaneers",
    TEN: "titans",
    WAS: "commanders"
}

type TeamAbbreviation = keyof typeof teamMap;

function isTeamAbbr(str: string): str is keyof typeof teamMap {
    return str in teamMap;
}

export function getTeamName(teamAbbr: string): string | undefined {
    if (isTeamAbbr(teamAbbr)) {
        return teamMap[teamAbbr];
    }
}