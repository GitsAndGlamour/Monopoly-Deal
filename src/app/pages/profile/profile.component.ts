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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  profiles: IProfileReadOnly[];
  friends: IProfileReadOnly[];
  sentInvites: IInvite[];
  receivedInvites: IInvite[];
  token: TokenPreference;
  tokens: TokenPreference[] = getEnumValues(TokenPreference);
  tokenCtrl = new FormControl(TokenPreference.MR_MONOPOLY);
  constructor(private route: ActivatedRoute, private service: ProfileService, public dialog: MatDialog) {
    this.profile = new Profile(this.route.parent.snapshot.data.profile);
    this.profiles = this.route.parent.snapshot.data.profiles;
    this.friends = this.route.parent.snapshot.data.friends;
    this.sentInvites = this.route.snapshot.data.invites.sent;
    this.receivedInvites = this.route.snapshot.data.invites.received;
  }

  ngOnInit() {
    this.token = TokenPreference.MR_MONOPOLY
  }

  addFriend() {
    this.dialog.open(AddFriendComponent, {
      data: { profiles: this.profiles },
      width: '450px',
      height: '600px',
    }).afterClosed().subscribe(async () => {
      this.friends = await this.service.friends();
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

  }

  async declineInvite(uid: string) {

  }

  async approveInvite(uid: string) {

  }
}
