import {Component, OnInit} from '@angular/core';
import {Game, IGame} from '../../classes/game';
import {ActivatedRoute} from '@angular/router';
import {IProfileReadOnly} from '../../classes/profile';
import {IPlayer} from '../../classes/player';
import {GameService} from '../../services/game/game.service';
import {ChatService} from '../../services/chat/chat.service';
import {IChat} from '../../classes/message';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  chat: IChat;
  profile: IProfileReadOnly;
  intent: string;
  constructor(private route: ActivatedRoute, private gameService: GameService, private chatService: ChatService) {
    this.game = new Game(route.snapshot.data.game);
    this.chat = route.snapshot.data.chat;
    this.profile = route.parent.snapshot.data.profile;
    this.intent = route.snapshot.queryParams.action;
  }

  async ngOnInit() {
    if (this.openSeats && this.isNewPlayer) {
      await this.addPlayerToGame();
    }
    if (!this.isParticipant) {
      await this.addPlayerToChat();
    }
  }

  get isPlaying() {
    return this.intent === 'play';
  }

  get isWatching() {
    return this.intent === 'watch';
  }

  get isParticipant() {
    return this.chat.participants.some(participant => participant.uid === this.profile.uid);
  }

  get isNewPlayer() {
    return this.isPlaying && !this.isAlreadyPlayer;
  }

  get isAlreadyPlayer() {
    return this.game.players.some(player => player.profileId === this.profile.uid);
  }

  get openSeats() {
    return this.game.seats - this.game.players.length;
  }

  async addPlayerToGame() {
    const player: IPlayer = {
      name: this.profile.displayName,
      owner: false,
      position: this.game.players.length,
      profile: this.profile,
      profileId: this.profile.uid,
      created: new Date()
    };
    await this.gameService.addPlayer(this.game, player);
  }

  async addPlayerToChat() {
    await this.chatService.addParticipant(this.game.id, this.profile);
  }

}
