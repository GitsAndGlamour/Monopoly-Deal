import { Component, OnInit } from '@angular/core';
import {Game} from '../../classes/game';
import {ActivatedRoute} from '@angular/router';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {CreateGameComponent} from './create-game/create-game.component';
import {Profile} from '../../classes/profile';
import {GameService} from '../../services/game/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: Game[];
  friends: Profile[];
  online: Profile[];
  constructor(private route: ActivatedRoute, private service: GameService, private _bottomSheet: MatBottomSheet) {
    this.games = route.snapshot.data.games;
    this.friends = route.snapshot.data.friends;
    this.online = route.snapshot.data.online;
  }

  ngOnInit() {
  }

  openBottomSheet(): void {
    this._bottomSheet.open(CreateGameComponent, { data: { index: this.games.length + 1, friends: this.friends }});
  }

}
