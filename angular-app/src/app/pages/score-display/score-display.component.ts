import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
} from 'ngx-bootstrap/modal';
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
  public games: any = [];
  private playerSubscription;
  public winner: any;
  modalRef: BsModalRef;
  @ViewChild('template', { static: false }) templateInTs;

  public newPlayer: Player = {
    _id: '',
    name: '',
    score: 0,
    isServing: false,
    winner: false,
  };

  constructor(
    private mainService: MainService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.playerSubscription = this.mainService.playerAsObservable.subscribe(
      (players: Player[]) => {
        this.players = players;
      }
    );
    this.getHistory();
  }

  openModal() {
    this.modalRef = this.modalService.show(this.templateInTs);
  }
  getHistory() {
    this.mainService.getHistory().subscribe((response) => {
      this.games = response;
    });
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
    if (this.winner && this.winner.name) {
      this.openModal();
    }
  }
  save() {
    this.mainService.saveScore(this.players).subscribe((response) => {
      this.modalRef.hide();
      this.getHistory();
    });
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
