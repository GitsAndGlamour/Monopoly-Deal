import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IProfile} from '../../classes/profile';
import {GameStatus, IGame} from '../../classes/game';
import {InviteService} from '../../services/invite/invite.service';
import {IInvite} from '../../classes/invite';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  player: IProfile;
  left: number;
  top: number;
  games: IGame[];
  profile: IProfile;
  invites: IInvite[];
  constructor(private route: ActivatedRoute, private router: Router, private inviteService: InviteService) {
    this.player = route.snapshot.data.player;
    this.games = route.snapshot.data.games;
    this.invites = [...route.snapshot.data.invites.sent, ...route.snapshot.data.invites.received];
    this.profile = route.parent.snapshot.data.profile;
    const {x , y} = route.snapshot.queryParams;
    this.left = parseInt(x, 10) - 100;
    this.top = parseInt(y, 10) - 100;

  }

  async ngOnInit() {
    console.log(this.player);
  }

  close() {
    this.router.navigate(['/lobby', {outlets: {popup: null}}]);
  }

  get spread(): {wins: number, losses: number, total: number} {
    const games = this.games || [];
    return {
      wins: games.filter(game => game.status === GameStatus.DONE && game.winner === this.player.uid).length,
      losses: games.filter(game => game.status === GameStatus.DONE && game.winner !== this.player.uid).length,
      total: games.filter(game => game.status === GameStatus.DONE).length,
    }
  }

  get activeGames(): IGame[] {
    return this.games.filter(game => game.status === GameStatus.STARTED || game.status === GameStatus.READY);
  }

  get isSelf() {
    return this.player.uid === this.profile.uid;
  }

  get isPending() {
    return this.invites.some(invite => invite.toId === this.player.uid || invite.fromId === this.player.uid)
  }

  get isFriend() {
    return this.profile.friends.some(friend => friend === this.player.uid)
  }

  async sendFriendRequest() {
    await this.inviteService.sendFriendInvite(this.player);
    const invites = await this.inviteService.invites();
    this.invites = [...invites.sent, ...invites.received];
  }
}
