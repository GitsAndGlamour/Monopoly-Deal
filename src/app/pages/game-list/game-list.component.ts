import {Component, OnInit} from '@angular/core';
import {Game, GameStatus, IGame} from '../../classes/game';
import {ActivatedRoute} from '@angular/router';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {CreateGameComponent} from './create-game/create-game.component';
import {IProfile, IProfileReadOnly, Profile} from '../../classes/profile';
import {GameService} from '../../services/game/game.service';
import {IconService} from '../../services/util/icon/icon.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: IGame[];
  profile: IProfile;
  friends: IProfileReadOnly[];
  online: IProfileReadOnly[];
  statuses = GameStatus;
  constructor(private route: ActivatedRoute, private service: GameService, private _bottomSheet: MatBottomSheet,
              private icon: IconService) {
    this.games = route.snapshot.data.games ? route.snapshot.data.games.map(game => new Game(game)) : [];
    this.friends = route.parent.snapshot.data.friends;
    this.online = route.snapshot.data.online;
    this.profile = route.parent.snapshot.data.profile;
  }

  ngOnInit() {
    console.log(this.games);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(CreateGameComponent, { data: { index: this.games.length + 1, friends: this.friends, profile: this.profile }})
        .afterDismissed().subscribe(async () => {
          this.games = await this.service.games();
    });
  }

  status(game: IGame) {
    switch(game.status) {
      case GameStatus.CANCELED: return 'gainsboro';
      case GameStatus.READY: return '#c8e6c9';
      case GameStatus.DONE: return 'white';
      case GameStatus.STARTED: return 'lightcyan';
    }
  }

  availableSeating(game: IGame): number {
    return game.players.filter(player => (!player.owner && player.name.includes('Player'))).length;
  }

}
