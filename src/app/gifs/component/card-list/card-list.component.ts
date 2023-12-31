import { Component, Input } from '@angular/core';
import { Gif } from '../../interface/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html'
})
export class CardListComponent {

  @Input('gifs')
  public gifsList: Gif [] = [];
}
