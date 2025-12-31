export type GenderFilter = "all" | "mens" | "womens";
export type SortOption = "rank" | "overall" | "pace" | "shooting" | "passing" | "dribbling" | "defending" | "physicality";
export const SORT_OPTIONS = [
    { id: "rank" as const, label: "Rank" },
    { id: "overall" as const, label: "Overall" },
    { id: "pace" as const, label: "Pace" },
    { id: "shooting" as const, label: "Shooting" },
    { id: "passing" as const, label: "Passing" },
    { id: "dribbling" as const, label: "Dribbling" },
    { id: "defending" as const, label: "Defending" },
    { id: "physicality" as const, label: "Physicality" },
] as const;

export const POSITION_OPTIONS = [
    {
        category: "Defense",
        positions: [
            { id: "GK", label: "Goalkeeper" },
            { id: "CB", label: "Center Back" },
            { id: "LB", label: "Left Back" },
            { id: "RB", label: "Right Back" },
        ]
    },
    {
        category: "Midfielder",
        positions: [
            { id: "CDM", label: "Center Defensive Midfielder" },
            { id: "CM", label: "Center Midfielder" },
            { id: "CAM", label: "Center Attacking Midfielder" },
            { id: "LM", label: "Left Midfielder" },
            { id: "RM", label: "Right Midfielder" },
        ]
    },
    {
        category: "Attack",
        positions: [
            { id: "LW", label: "Left Wing" },
            { id: "RW", label: "Right Wing" },
            { id: "ST", label: "Striker" },
        ]
    }
] as const;