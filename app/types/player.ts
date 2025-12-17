export interface Player {
    id: number;
    rank: number;
    overallRating: number;
    firstName: string;
    lastName: string;
    commonName: null | string;
    birthdate: string;
    height: number;
    skillMoves: number;
    weakFootAbility: number;
    preferredFoot: number;
    leagueName: string;
    weight: number;
    avatarUrl: string;
    shieldUrl: string;
    alternatePositions: Position[];
    playerAbilities: Ability[];
    gender: Gender;
    nationality: Nationality;
    team: Team;
    position: Position;
    stats: { [key: string]: Stat };
}

export interface Position {
    id: string;
    label: string;
    shortLabel: string;
    positionType?: PositionType;
}

export interface PositionType {
    id: string;
    name: string;
}

export interface Gender {
    id: number;
    label: string;
}

export interface Nationality {
    id: number;
    label: string;
    imageUrl: string;
}

export interface Team {
    id: number;
    label: string;
    imageUrl: string;
    isPopular: boolean;
}

export interface Ability {
    id: string;
    label: string;
    description: string;
    imageUrl: string;
    type: AbilityType;
}

export interface AbilityType {
    id: string;
    label: string;
}

export interface Stat {
    value: number;
    diff: number;
}


// Stat column mappings to match EA website
export const STAT_COLUMNS = [
    { key: "pac", label: "PAC" },
    { key: "sho", label: "SHO" },
    { key: "pas", label: "PAS" },
    { key: "dri", label: "DRI" },
    { key: "def", label: "DEF" },
    { key: "phy", label: "PHY" },
];