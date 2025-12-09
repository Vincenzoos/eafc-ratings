import { Player } from "../types/player";


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
