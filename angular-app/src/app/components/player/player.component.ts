import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  @Input() currentPlayer: Player;
  @Input() playerNumber: number;
  @Input() winner: boolean;
  @Output() scoreChanged: EventEmitter<Player> = new EventEmitter<Player>();
  constructor() {}

  ngOnInit(): void {}

  addToScore() {
    if (!this.winner) {
      this.currentPlayer.score++;
      this.scoreChanged.emit();
    }
  }
}
