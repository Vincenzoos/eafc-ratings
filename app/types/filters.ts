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