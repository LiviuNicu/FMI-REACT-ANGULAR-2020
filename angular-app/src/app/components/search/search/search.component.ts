import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Player } from 'src/app/interfaces/player';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public players: Player[] = [];
  public name: string = '';
  public textChanged: Subject<string> = new Subject<string>();
  public isServingState: boolean = true;
  public today = new Date();
  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.doSearch('');
    this.textChanged.pipe(debounceTime(3000)).subscribe((data) => {
      this.doSearch(data);
    });
    console.log(this.today);
  }

  onFieldChanged() {
    this.textChanged.next(this.name);
  }

  doSearch(name) {
    this.mainService.search({ name: name }).subscribe((response: Player[]) => {
      this.players = response;
    });
  }
}
