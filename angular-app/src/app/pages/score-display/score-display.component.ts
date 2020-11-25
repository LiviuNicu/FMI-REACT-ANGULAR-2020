import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Player } from 'src/app/interfaces/player';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-score-display',
  templateUrl: './score-display.component.html',
  styleUrls: ['./score-display.component.css'],
})
export class ScoreDisplayComponent implements OnInit {
  public players: Player[] = [];
  private playerSubscription;
  public winner: any;

  public newPlayer: Player = {
    _id: '',
    name: '',
    score: 0,
    isServing: false,
    winner: false,
  };

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.playerSubscription = this.mainService.playerAsObservable.subscribe(
      (players: Player[]) => {
        this.players = players;
      }
    );
  }

  addPlayer(player: Player) {
    const playeToAdd = JSON.parse(JSON.stringify(player));
    this.mainService.addPlayer(playeToAdd);
    this.newPlayer = {
      _id: '',
      name: '',
      score: 0,
      isServing: false,
      winner: false,
    };
  }

  getSum(players: Player[]) {
    return players.reduce((accumulator, currentElement) => {
      return (accumulator += currentElement.score);
    }, 0);
  }

  verifyWinner() {
    this.winner = this.players.find((item) => item.score === 21);
  }

  updatePlayer() {
    const sum = this.getSum(this.players);

    if (sum % 5 === 0) {
      this.players.map((item) => {
        item.isServing = !item.isServing;
        return item;
      });
    }
    this.verifyWinner();
    this.mainService.updatePlayers(this.players);
  }

  newPlayers() {
    this.winner = null;
    this.mainService.updatePlayers([]);
  }

  resetScore() {
    this.winner = null;
    this.players.map((item) => {
      item.score = 0;
      return item;
    });

    this.mainService.updatePlayers(this.players);
  }

  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
  }
}
