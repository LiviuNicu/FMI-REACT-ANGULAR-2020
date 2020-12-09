import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../interfaces/player';

@Pipe({
  name: 'isServingFilter',
})
export class IsServingFilterPipe implements PipeTransform {
  transform(players: Player[], isServing: boolean): any {
    return players.filter((player) => player.isServing === isServing);
  }
}
