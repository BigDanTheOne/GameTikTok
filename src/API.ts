import games from './constants/games'

export function getGames(offset: number, limit: number) {
  return games.slice(offset % games.length, offset % games.length + limit)
}