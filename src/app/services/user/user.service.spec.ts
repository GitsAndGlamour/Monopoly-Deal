import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {ServiceSpecModule} from '../service.spec.module';
import {User} from 'firebase';
import {StoreService} from '../firebase/store/store.service';
import {MockLocalStorage} from '../../../test/mock/local-storage.mock';

describe('UserService', () => {
  let service: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ServiceSpecModule
      ],
      providers: [
      ]
    });
    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a user', async () => {
    const uid = 'testMzcYKDpjeROPmtmEd8AU';
    const spy =
        jasmine.createSpyObj('StoreService', ['getDocument']);
    spy.getDocument.and.callFake((collection, document) => {
      return  {
        uid,
        email: 'create.test@monopolydeal.com'
      };
    });
    service = new UserService(spy)
    const user = await service.user('testMzcYKDpjeROPmtmEd8AU');
    expect(user.uid).not.toBeNull();
    expect(user.uid).toEqual(uid);
  });

  it('should create a user', async () => {
    const spy =
        jasmine.createSpyObj('StoreService', ['addDocument', 'getDocument']);
    spy.addDocument.and.callFake((collection, document, data: User) => {
      return MockLocalStorage.setItem(document, JSON.stringify(data));
    });
    spy.getDocument.and.callFake((collection, document) => {
      const user = JSON.parse(MockLocalStorage.getItem(document));
      return user;
    });
    service = new UserService(spy)
    const user = {
      uid: 'testMzcYKDpjeROPmtmEd8AU',
      email: 'create.test@monopolydeal.com'
    };
    await service.create(user as User);
    const createdUser = await service.user(user.uid);
    expect(createdUser.uid).not.toBeNull();
    expect(createdUser.uid).toEqual('testMzcYKDpjeROPmtmEd8AU');
  });

  it('should update a user', async () => {
    const uid = 'testMzcYKDpjeROPmtmEd8AU';
    MockLocalStorage.setItem(uid, JSON.stringify({uid, email: 'create.test@monopolydeal.com'}));

    const originalUser:User = JSON.parse(MockLocalStorage.getItem(uid));
    expect(originalUser.email).toEqual('create.test@monopolydeal.com');

    const spy =
        jasmine.createSpyObj('StoreService', ['updateDocument', 'getDocument']);
    spy.updateDocument.and.callFake((collection, document, data: User) => {
      const user: User = JSON.parse(MockLocalStorage.getItem(document));
      const updatedUser = Object.assign({}, user, data);
      return MockLocalStorage.setItem(document, JSON.stringify(updatedUser));
    });
    spy.getDocument.and.callFake((collection, document) => {
      const user = JSON.parse(MockLocalStorage.getItem(document));
      return user;
    });

    service = new UserService(spy)
    const user = {
      uid,
      email: 'create.test.edit@monopolydeal.com'
    };
    await service.update(user as User);

    const updatedUser = await service.user(uid);
    expect(updatedUser.uid).not.toBeNull();
    expect(updatedUser.uid).toEqual('testMzcYKDpjeROPmtmEd8AU');
    expect(updatedUser.email).toEqual('create.test.edit@monopolydeal.com');
  });
});
