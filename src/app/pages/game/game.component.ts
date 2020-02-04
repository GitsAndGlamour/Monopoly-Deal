import {Component, OnInit} from '@angular/core';
import {Game, IGame} from '../../classes/game';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: IGame;
  constructor(private route: ActivatedRoute) {
    this.game = new Game(route.snapshot.data.game);
  }

  ngOnInit() {
    console.log(this.game);
  }

}
