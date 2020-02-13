import {Component, OnInit} from '@angular/core';
import {Game, GameStatus, IGame} from '../../classes/game';
import {ActivatedRoute, Router} from '@angular/router';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {CreateGameComponent} from './create-game/create-game.component';
import {IProfile, IProfileReadOnly, Profile} from '../../classes/profile';
import {GameService} from '../../services/game/game.service';
import {IconService} from '../../services/util/icon/icon.service';
import {PlayerService} from '../../services/player/player.service';

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
  constructor(private route: ActivatedRoute,
              private service: GameService,
              private _bottomSheet: MatBottomSheet,
              private icon: IconService,
              private router: Router,
              private playerService: PlayerService) {
    this.games = route.snapshot.data.games ? route.snapshot.data.games.map(game => new Game(game)) : [];
    this.friends = route.parent.snapshot.data.friends;
    this.online = route.snapshot.data.online;
    this.profile = route.parent.snapshot.data.profile;
  }

  ngOnInit() {
    console.log(this.games);
    this.service.gameChanges().subscribe(async () => {
      this.games = await this.service.games();
    });
    this.playerService.onlineChanges().subscribe(async () => {
      this.online = await this.playerService.online();
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(CreateGameComponent, { data: { index: this.games.length + 1, friends: this.friends, profile: this.profile }})
        .afterDismissed().subscribe(async () => {
          this.games = await this.service.games();
    });
  }

  showPlayerPopup(event, profile: string) {
    const x = event.pageX;
    const y = event.pageY;
    console.log(x, y);
    this.router.navigate(['/lobby', {outlets: {popup: ['player', profile]}}], { queryParams: {x, y}});
  }

  getStatusColor(game: IGame) {
    switch(game.status) {
      case GameStatus.CANCELED: return 'gainsboro';
      case GameStatus.READY: return '#c8e6c9';
      case GameStatus.DONE: return 'white';
      case GameStatus.STARTED: return 'lightcyan';
    }
  }

  getAvailableSeatingCount(game: IGame): number {
    return game.seats - game.bots - 1;
  }
}
