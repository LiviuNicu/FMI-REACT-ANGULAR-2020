import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private url: string = environment.url;

  private players = new BehaviorSubject<Player[]>([]);
  public playerAsObservable = this.players.asObservable();

  constructor(private http: HttpClient) {}

  addPlayer(player: Player) {
    this.players.next([...this.players.getValue(), player]);
  }

  updatePlayers(players: Player[]) {
    this.players.next(players);
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
      withCredentials: false,
    };
  }

  register(data: any): Observable<any> {
    return this.http
      .post(this.url + 'user/register', data, this.getHeaders())
      .pipe(
        tap((response) => console.log(response)),
        catchError(this.handleError('register'))
      );
  }

  login(data: any): Observable<any> {
    return this.http
      .post(this.url + 'user/login', data, this.getHeaders())
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      if (error.status == 401) {
        console.log('NU MAI AI ACCES!');
      }
      return of(result as T);
    };
  }
}
