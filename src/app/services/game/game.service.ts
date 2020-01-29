import moment from 'moment';
import {Injectable} from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {Game} from '../../classes/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  collection = 'games';
  constructor(private storage: StoreService<Game>) { }

  async games(): Promise<Game[]> {
    return this.storage.getCollectionWhere(this.collection,
        { fieldPath: 'created', opStr: '>=', value: moment().subtract(1, 'days').from(moment.now()).toString()})
  }

  async game(id: string): Promise<Game> {
    return this.storage.getDocument(this.collection, id);
  }
}
