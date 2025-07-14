import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-player-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.css']
})
export class PlayerInputComponent {
  name1 = '';
  name2 = '';
  error = '';

  constructor(public game: GameService) {}

  get showBanner() {
    return this.game.showNameWarningBanner;
  }

  closeBanner() {
    this.game.showNameWarningBanner = false;
  }

  validateName(name: string): boolean {
    return /^[A-Za-z]{3,}$/.test(name);
  }

  submit() {
    if (this.validateName(this.name1) && this.validateName(this.name2)) {
      this.game.setPlayers(this.name1, this.name2);
      this.error = '';
    } else {
      this.error = 'Please enter valid names (letters only, min 3 chars).';
    }
  }

  restart() {
    this.game.restartGame();
    this.name1 = '';
    this.name2 = '';
    this.error = '';
  }
}
