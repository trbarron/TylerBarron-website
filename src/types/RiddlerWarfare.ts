export interface battleLogic {
    _scoreA: number;
    _scoreB: number;
    _exception: string;
}

export interface submitArmyResponse {
    armyWins: number;
    armyGamesPlayed: number;
}

export interface playerData {
    title: string;
    value: number;
}