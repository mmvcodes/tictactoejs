import { Component } from '@angular/core';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { GameComponent } from './components/game/game.component';
import { PlayerInputComponent } from './components/player-input/player-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ScoreboardComponent,
    GameComponent,
    PlayerInputComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
