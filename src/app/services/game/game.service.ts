import moment from 'moment';
import {Injectable} from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {IGame} from '../../classes/game';
import {Observable} from 'rxjs';
import {IPlayer} from '../../classes/player';
import {IGameInvite} from '../../classes/invite';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private storage: StoreService<IGame>) { }

  async games(): Promise<IGame[]> {
    return this.storage.getCollection('games');
  }

  async gamesByProfile(id: string): Promise<IGame[]> {
    return this.storage.getCollectionWhere('games', {fieldPath: 'attendees', opStr: "array-contains", value: id})
  }

  async game(id: string): Promise<IGame> {
    return this.storage.getDocument('games', id);
  }

  gameChanges(): Observable<any> {
    return this.storage.getCollectionChanges('games');
  }

  async generateId(): Promise<string> {
    return this.storage.getId('games');
  }

  async create(game: IGame): Promise<void> {
    return this.storage.addDocument('games', game.id, game);
  }

  async addPlayer(game: IGame, player: IPlayer): Promise<void> {
    return this.storage.addToArrayInDocument('games', game.id, 'players', player);
  }

  async addRequest(game: IGame, request: IGameInvite): Promise<void> {
    return this.storage.addToArrayInDocument('games', game.id, 'requests', request);
  }
}
