import {DefenseStats, PassingStats, ReceivingStats, RushingStats} from "@/interfaces/playerStats";

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
    jerseyNumber: string;
    lastGamePlayed: string;
    name: string;
    playerID: string;
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

export interface PlayerInfoProps {
    player: PlayerInfo;
}