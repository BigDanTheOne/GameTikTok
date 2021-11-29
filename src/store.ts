import { makeAutoObservable } from 'mobx'
import { IGame } from './types'
import settings from './constants/settings'
import * as API from './API'

class Store {
  games: IGame[] = []
  currentGame: IGame
  offset: number
  isFullscreen: boolean
  moveGames: (offset: number) => any

  constructor() {
    makeAutoObservable(this)

    this.offset = 0
    this.games = API.getGames(this.offset, 1 + settings.preloadAfter)
    this.currentGame = this.games[0]
  }

  updateGame(id: IGame['id'], key: keyof IGame, value: any) {
    const foundGame = this.games.find(item => item.id === id)
    if (!foundGame) return console.error('Game not found:', id);
    (foundGame[key] as IGame[keyof IGame]) = value
  }

  prevGame() {
    this.offset--
    this.games = API.getGames(this.offset, 1)
      .concat(
        this.games
          .slice(0, this.games.length - 1),
      )
    this.currentGame = this.games[
      this.games.length === settings.preloadBefore + 1 + settings.preloadAfter ? settings.preloadBefore : 0
    ]
  }

  nextGame() {
    this.offset++
    this.games = this.games
      .slice(1)
      .concat(API.getGames(this.offset + settings.preloadAfter, 1))
    this.currentGame = this.games[
      settings.preloadBefore
    ]
  }
}

export default new Store()