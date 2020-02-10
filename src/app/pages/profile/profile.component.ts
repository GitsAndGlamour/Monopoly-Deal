import {Component, OnInit} from '@angular/core';
import {IProfileReadOnly, Profile} from '../../classes/profile';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../services/profile/profile.service';
import {MatDialog} from '@angular/material/dialog';
import {AddFriendComponent} from './add-friend/add-friend.component';
import {TokenPreference} from '../../classes/preferences';
import {getEnumValues} from '../../helpers/functions';
import {FormControl} from '@angular/forms';
import {IInvite} from '../../classes/invite';
import {InviteService} from '../../services/invite/invite.service';

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
  constructor(private route: ActivatedRoute, private service: ProfileService, public dialog: MatDialog, private inviteService: InviteService) {
    this.profile = new Profile(this.route.parent.snapshot.data.profile);
    this.profiles = this.route.parent.snapshot.data.profiles;
    this.friends = this.route.parent.snapshot.data.friends;
    this.invites = this.route.snapshot.data.invites;
  }

  ngOnInit() {
    this.token = TokenPreference.MR_MONOPOLY;
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

  async updateToken() {
    await this.service.updateToken(this.token);
    this.profile = new Profile(await this.service.profile());
  }

  async unsendInvite(uid: string) {
    await this.inviteService.unsendFriendInvite(uid);
    this.invites = await this.inviteService.invites();
  }

  async declineInvite(uid: string) {
    await this.inviteService.declineFriendInvite(uid);
    this.invites = await this.inviteService.invites();
  }

  async approveInvite(uid: string) {
    await this.inviteService.acceptFriendInvite(uid);
    this.invites = await this.inviteService.invites();
  }
}
