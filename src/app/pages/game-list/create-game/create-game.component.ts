import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {IProfile, IProfileReadOnly} from '../../../classes/profile';
import {map, startWith} from 'rxjs/operators';
import {GameStatus, IGame} from '../../../classes/game';
import {GameService} from '../../../services/game/game.service';
import {ReadyGameStatusTrigger} from '../../../triggers/game/ready-game-status.trigger';
import {InvitationStatus} from '../../../classes/invite';
import {InviteService} from '../../../services/invite/invite.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
  form: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredFriends: Observable<IProfileReadOnly[]>;
  friends: IProfileReadOnly[] = [];
  allFriends: IProfileReadOnly[] = this.data.friends;
  @ViewChild('friendInput', {static: false}) friendInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private _bottomSheetRef: MatBottomSheetRef<CreateGameComponent>,
              private builder: FormBuilder,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
                index: number,
                friends: IProfileReadOnly[],
                profile: IProfile
              },
              private service: GameService,
              private trigger: ReadyGameStatusTrigger,
              private inviteService: InviteService) {
    this.form = this.builder.group({
      name: `Game #${data.index}`,
      seats: 2,
      bots: 0,
      invites: '',
      public: true,
      viewable: true,
      ranked: false,
      friends: false,
    });

    this.filteredFriends = this.form.get('invites').valueChanges.pipe(
        startWith(null),
        map((friend: IProfileReadOnly | null) => friend ? this._filter(friend) : this.allFriends));
  }

  ngOnInit() {
  }

  async submit(event: MouseEvent): Promise<void> {
    this._bottomSheetRef.dismiss();
    event.preventDefault();

    const gameId = await this.service.generateId();
    const game: IGame = {
      bots: this.form.get('bots').value,
      created: new Date(),
      friends: this.form.get('friends').value,
      id: gameId,
      attendees: [this.data.profile.uid],
      invites: await Promise.all(this.friends.map(async friend => ({
        id: await this.inviteService.getId(),
        toId: friend.uid,
        to: {
          uid: friend.uid,
          displayName: friend.displayName,
          username: friend.username,
          created: friend.created,
          token: friend.token,
        },
        fromId: this.data.profile.uid,
        from: {
          uid: this.data.profile.uid,
          displayName: this.data.profile.displayName,
          username: this.data.profile.username,
          created: this.data.profile.created,
          token: this.data.profile.token,
        },
        status: InvitationStatus.SENT,
        game: {
          id: gameId,
          name: this.form.get('name').value,
          status: GameStatus.READY,
        },
        created: new Date()}))),
      name: this.form.get('name').value,
      owner: this.data.profile.uid,
      players: [],
      public: this.form.get('public').value,
      ranked: this.form.get('ranked').value,
      seats: this.form.get('seats').value,
      status: GameStatus.READY,
      viewable: this.form.get('viewable').value
    };

  await this.trigger.execute(game);
  }

  selected(friend: IProfileReadOnly): void {
    if (!this.friends.some(selected => selected.username === friend.username)) {
      this.friends.push(friend);
      this.friendInput.nativeElement.value = '';
      this.form.get('invites').setValue(null);
    }
  }

  remove(profile: IProfileReadOnly): void {
    const index = this.friends.indexOf(profile);

    if (index >= 0) {
      this.friends.splice(index, 1);
    }
  }

  private _filter(value: IProfileReadOnly): IProfileReadOnly[] {
    if (value) {
      const displayNameFilterValue = value.displayName ? value.displayName.toLowerCase() : '';
      const usernameFilterValue = value.username ? value.username.toLowerCase() : '';
      return this.allFriends.filter(friend => (
          friend.displayName.toLowerCase().indexOf(displayNameFilterValue) === 0 ||
          friend.username.toLowerCase().indexOf(usernameFilterValue) === 0) &&
          !this.friends.some(selected => friend.username === selected.username)
      );
    }
  }
}

