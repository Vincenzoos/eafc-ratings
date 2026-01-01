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


export const TEAM_OPTIONS = [
    { id: "barcelona", name: "FC Barcelona", logo: "https://drop-assets.ea.com/images/1omg1GUYiuhDZzro6k79Gp/c3c15c873e984dae4e34fac491248b33/l116325.png" },
    { id: "real_madrid", name: "Real Madrid", logo: "https://drop-assets.ea.com/images/Pk8nYrWuRt895RlhJx8jI/445d98b711f413a3a1e70c41b19b0f95/l243.png" },
    { id: "psg", name: "Paris SG", logo: "https://drop-assets.ea.com/images/2QwnhmHh5K7bjkfZAF7ZCi/7c53874542fb5c606ff810a4b1f6b88b/l73.png" },
    { id: "juventus", name: "Juventus", logo: "https://drop-assets.ea.com/images/6zWQmPATtK8lpsiXbKb3mY/6b2d1dab08ef14f63271a5cd70a0db0d/l45.png" },
    { id: "ol_lyon", name: "OL Lyonnes", logo: "https://drop-assets.ea.com/images/6CoUOe5iw6EdXzTsRUgPhB/e3e12054d723a75cfc7331a8276e00a3/l116033.png" },
    { id: "arsenal", name: "Arsenal", logo: "https://drop-assets.ea.com/images/4rvnUS4EekAo5w8ckcUlW8/96274cde68a9488f484ec96d642941d0/l116009.png" },
    { id: "chelsea", name: "Chelsea", logo: "https://drop-assets.ea.com/images/3vni1UAimBV1Ffc3NbgIJp/40f6d3391ea7b8a43f79ce4c118a8ca2/l116010.png" },
    { id: "man_utd", name: "Manchester Utd", logo: "https://drop-assets.ea.com/images/5xxJeUfFY6FEQZEJyJK35/990979becf88b88ecb6461dc441c2ebf/l11.png" },
    { id: "man_city", name: "Manchester City", logo: "https://drop-assets.ea.com/images/4ujf5zNmgTkQjfrGAT7583/be81b2a43abea89812157a320a3e7c0e/l116017.png" },
    { id: "liverpool", name: "Liverpool", logo: "https://drop-assets.ea.com/images/2Gyqk6OVRvcTKqNfIXTwyr/3e8964b35ccf9cb9a795a6f99ed8e969/l116343.png" },
];