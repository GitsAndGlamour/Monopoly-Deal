import moment from 'moment';
import {Injectable} from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {IGame} from '../../classes/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private storage: StoreService<IGame>) { }

  async games(): Promise<IGame[]> {
    return this.storage.getCollection('games');
  }

  async game(id: string): Promise<IGame> {
    return this.storage.getDocument('games', id);
  }

  async generateId(): Promise<string> {
    return this.storage.getId('games');
  }

  async create(game: IGame): Promise<void> {
    return this.storage.addDocument('games', game.id, game);
  }
}
