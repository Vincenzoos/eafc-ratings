import { Player } from "../types/player";

// Fetches all player data from the external API
export async function getPlayers(): Promise<Player[]> {
  const res = await fetch("https://drop-api.ea.com/rating/ea-sports-fc");

  // Error Handling
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  // API structure
  /* {
    items: list of player object,
    totalItems: number of players
  } */
  const jsonResponse = await res.json();
  const players = jsonResponse.items;
  return players;
}

// GET request to fetch player details by ID
export async function getPlayerById(id: string): Promise<Player | undefined> {
  const players = await getPlayers();
  return players.find((p) => p.id.toString() === id);
}