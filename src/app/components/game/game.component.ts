import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private bgm!: HTMLAudioElement;
  private clickX!: HTMLAudioElement;
  private clickO!: HTMLAudioElement;

  constructor(public game: GameService) {}

  ngOnInit(): void {
    // 🎵 Background music
    this.bgm = new Audio('assets/sounds/bgm.mp3');
    this.bgm.loop = true;
    this.bgm.volume = 0.15;
    this.bgm.play().catch(() => {
      console.warn('Autoplay blocked — will play on first click');
    });

    // 🔊 Click sounds
    this.clickX = new Audio('assets/sounds/click-x.mp3');
    this.clickO = new Audio('assets/sounds/click-o.mp3');
    this.clickX.volume = 0.9;
    this.clickO.volume = 0.9;
  }

  // Fallback: play bgm if autoplay was blocked
  playBgmIfBlocked(): void {
    if (this.bgm && this.bgm.paused) {
      this.bgm.play().catch(() => {});
    }
  }

  // Play click sound based on symbol
  playClickSound(symbol: string): void {
    const sound = symbol === 'X' ? this.clickX : this.clickO;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  onCellClick(index: number): void {
    this.playBgmIfBlocked(); // 🎵 ensure bgm starts
    if (!this.game.gameStarted) {
      this.game.showNameWarningBanner = true;
      return;
    }

    if (
      this.game.board[index] ||
      this.game.winnerBanner ||
      this.game.round > this.game.maxRounds
    ) return;

    const symbol = this.game.currentPlayerIndex === 0 ? 'X' : 'O';
    this.playClickSound(symbol); // 🔊 play click sound

    this.game.board[index] = symbol;

    if (this.checkWinner()) {
      this.game.scores[this.game.currentPlayerIndex]++;
      this.game.winnerBanner = `${this.game.players[this.game.currentPlayerIndex]} wins this round!`;
      setTimeout(() => this.handleRoundComplete(), 2500);
    } else if (!this.game.board.includes('')) {
      this.game.winnerBanner = 'Draw!';
      setTimeout(() => this.handleRoundComplete(), 2500);
    } else {
      this.game.currentPlayerIndex = 1 - this.game.currentPlayerIndex;
    }
  }

  handleRoundComplete(): void {
    if (this.game.round < this.game.maxRounds) {
      this.game.round++;
      this.game.board = Array(9).fill('');
      this.game.winnerBanner = '';
      this.game.currentPlayerIndex = this.game.round % 2 === 0 ? 0 : 1;
    } else {
      this.game.winnerBanner = 'Game Over!';
    }
  }

  checkWinner(): boolean {
    const b = this.game.board;
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return wins.some(([a, b1, c]) => b[a] && b[a] === b[b1] && b[a] === b[c]);
  }
}
