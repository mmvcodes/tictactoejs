import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameService {
  players = ['', ''];
  scores = [0, 0];
  round = 1;
  maxRounds = 5;
  board: string[] = Array(9).fill('');
  currentPlayerIndex = 0;
  gameStarted = false;
  winnerBanner = '';
  showNameWarningBanner = false;

  setPlayers(p1: string, p2: string) {
    this.players = [p1, p2];
    this.scores = [0, 0];
    this.round = 1;
    this.board = Array(9).fill('');
    this.currentPlayerIndex = 0;
    this.gameStarted = true;
    this.winnerBanner = '';
    this.showNameWarningBanner = false;
  }

  restartGame() {
    this.players = ['', ''];
    this.scores = [0, 0];
    this.round = 1;
    this.board = Array(9).fill('');
    this.currentPlayerIndex = 0;
    this.gameStarted = false;
    this.winnerBanner = '';
    this.showNameWarningBanner = false;
  }
}
