import {Component, OnInit} from '@angular/core';
import {Game, GameStatus, IGame} from '../../classes/game';
import {ActivatedRoute, Router} from '@angular/router';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {CreateGameComponent} from './create-game/create-game.component';
import {IProfile, IProfileReadOnly} from '../../classes/profile';
import {GameService} from '../../services/game/game.service';
import {IconService} from '../../services/util/icon/icon.service';
import {PlayerService} from '../../services/player/player.service';
import {IGameInvite, InvitationStatus} from '../../classes/invite';
import {InviteService} from '../../services/invite/invite.service';
import {NotificationService} from '../../services/notification/notification.service';

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
              private inviteService: InviteService,
              private notificationService: NotificationService,
              private router: Router,
              private playerService: PlayerService) {
    this.games = route.snapshot.data.games ? route.snapshot.data.games.map(game => new Game(game)) : [];
    this.friends = route.parent.snapshot.data.friends;
    this.online = route.snapshot.data.online;
    this.profile = route.parent.snapshot.data.profile;
  }

  ngOnInit() {
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
    return game.seats - game.players.length;
  }

  isOwnerOf(game: IGame) {
    return this.profile.uid === game.owner;
  }

  isApproved(game: IGame) {
    return (
      game.owner === this.profile.uid || // Is owner
      game.players.some(player => player.profileId === this.profile.uid) || // Is player
      game.invites.some(invite => invite.toId === this.profile.uid) || // Is invited
      (game.friends && this.profile.friends.some(friend => friend === game.owner)) || // Is friend
      game.requests.some(request => request.fromId === this.profile.uid && request.status === InvitationStatus.ACCEPTED)); // Is accepted
  }

  isRequested(game: IGame) {
    return game.requests.some(request => request.fromId === this.profile.uid);
  }

  async sendRequest(game: IGame) {
    const id = await this.inviteService.getId();
    const owner = await this.playerService.player(game.owner);
    const request: IGameInvite = {
      id,
      created: new Date(),
      from: {
        uid: this.profile.uid,
        displayName: this.profile.displayName,
        username: this.profile.username,
        created: this.profile.created,
        token: this.profile.token,
      },
      fromId: this.profile.uid,
      game: {
        id: game.id,
        name: game.name,
        status: game.status,
      },
      request: true,
      status: InvitationStatus.SENT,
      to: {
        uid: owner.uid,
        displayName: owner.displayName,
        username: owner.username,
        created: owner.created,
        token: owner.token,
      },
      toId: game.owner
    };
    await this.notificationService.sendGameRequestNotification(request);
    await this.service.addRequest(game, request);
  }
}
