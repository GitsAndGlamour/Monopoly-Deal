import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IProfileReadOnly, Profile} from '../../classes/profile';
import {GameService} from '../../services/game/game.service';
import {GameStatus, IGame} from '../../classes/game';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  player: Profile;
  left: number;
  top: number;
  games: IGame[];
  constructor(private route: ActivatedRoute, private router: Router, private gamesService: GameService) {
    this.player = new Profile(route.snapshot.data.player as IProfileReadOnly);
    this.games = route.snapshot.data.games;
    const {x , y} = route.snapshot.queryParams;
    this.left = parseInt(x, 10) - 100;
    this.top = parseInt(y, 10) - 100;

  }

  async ngOnInit() {
    console.log(this.player);
  }

  closePopup() {
    this.router.navigate(['/lobby', {outlets: {popup: null}}]);
  }

  get count(): {wins: number, losses: number, total: number} {
    const games = this.games || [];
    return {
      wins: games.filter(game => game.status === GameStatus.DONE && game.winner === this.player.uid).length,
      losses: games.filter(game => game.status === GameStatus.DONE && game.winner !== this.player.uid).length,
      total: games.filter(game => game.status === GameStatus.DONE).length,
    }
  }

  get active(): IGame[] {
    return this.games.filter(game => game.status === GameStatus.STARTED || game.status === GameStatus.READY);
  }
}
