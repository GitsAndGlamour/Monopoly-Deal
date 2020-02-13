import {Component, OnInit} from '@angular/core';
import {IProfileReadOnly, Profile} from '../../classes/profile';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddFriendComponent} from './add-friend/add-friend.component';
import {TokenPreference} from '../../classes/preferences';
import {getEnumValues} from '../../helpers/functions';
import {FormControl, Validators} from '@angular/forms';
import {IInvite} from '../../classes/invite';
import {InviteService} from '../../services/invite/invite.service';
import {DISPLAY_NAME_REGEX, USERNAME_REGEX} from '../../helpers/constants';
import {UsernameValidator} from '../../validators/username.validator';
import {FriendProfileService} from '../../services/profile/friend-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  profiles: IProfileReadOnly[];
  friends: IProfileReadOnly[];
  invites: { sent: IInvite[], received: IInvite[]} = { sent: [], received: [] };
  token: TokenPreference;
  tokens: TokenPreference[] = getEnumValues(TokenPreference);
  tokenCtrl = new FormControl(TokenPreference.MR_MONOPOLY);
  displayNameCtrl: FormControl;
  usernameCtrl: FormControl;
  field: string;
  constructor(private route: ActivatedRoute,
              private service: FriendProfileService,
              public dialog: MatDialog,
              private inviteService: InviteService,
              private usernameValidator: UsernameValidator) {
    this.profile = new Profile(this.route.parent.snapshot.data.profile);
    this.profiles = this.route.parent.snapshot.data.profiles;
    this.friends = this.route.parent.snapshot.data.friends;
    this.invites = this.route.snapshot.data.invites;

    this.displayNameCtrl = new FormControl(this.profile.displayName, [
      Validators.minLength(4),
      Validators.pattern(DISPLAY_NAME_REGEX)
    ]);

    this.usernameCtrl = new FormControl(this.profile.username, [
      Validators.minLength(4),
      Validators.pattern(USERNAME_REGEX),
    ],
    [this.usernameValidator.usernameValidator()]);
  }

  ngOnInit() {
    this.token = TokenPreference.MR_MONOPOLY;
  }

  async edit(control: FormControl) {
    if (!control.errors && !control.pending) {
      const profile: Partial<IProfileReadOnly> = { uid: this.profile.uid };
      profile[this.field] = control.value;
      await this.service.update(profile);
      this.profile = new Profile(await this.service.profile());
      this.field = null;
    }
  }

  addFriend() {
    this.dialog.open(AddFriendComponent, {
      data: {
        profile: this.profile,
        profiles: this.profiles,
        friends: this.friends,
        invites: [...this.invites.sent.map(invite => invite.to),
          ...this.invites.received.map(invite => invite.from)]
      },
      width: '450px',
      height: '600px',
    }).afterClosed().subscribe(async () => {
      this.invites = await this.inviteService.invites();
    });
  }

  async removeFriend(uid: string) {
    await this.service.removeFriend(uid);
    this.friends = await this.service.friends();
  }

  async unsendInvite(uid: string) {
    await this.inviteService.unsendFriendInvite(uid);
    this.invites = await this.inviteService.invites();
  }

  async approveInvite(uid: string) {
    await this.inviteService.acceptFriendInvite(uid);
    this.invites = await this.inviteService.invites();
    this.friends = await this.service.friends();
  }

  async declineInvite(uid: string) {
    await this.inviteService.declineFriendInvite(uid);
    this.invites = await this.inviteService.invites();
  }

  async updateToken() {
    await this.service.updateToken(this.token);
    this.profile = new Profile(await this.service.profile());
  }
}
