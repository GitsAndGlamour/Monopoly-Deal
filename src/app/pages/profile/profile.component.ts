import {Component, OnInit} from '@angular/core';
import {IProfileReadOnly, Profile} from '../../classes/profile';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../services/profile/profile.service';
import {MatDialog} from '@angular/material/dialog';
import {AddFriendComponent} from './add-friend/add-friend.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  profiles: IProfileReadOnly[];
  friends: IProfileReadOnly[];
  constructor(private route: ActivatedRoute, private service: ProfileService, public dialog: MatDialog) {
    this.profile = new Profile(this.route.parent.snapshot.data.profile);
    this.profiles = this.route.parent.snapshot.data.profiles;
    this.friends = this.route.parent.snapshot.data.friends;
    console.log(this.profile, this.profiles, this.friends);
  }

  ngOnInit() {
  }

  addFriend() {
    this.dialog.open(AddFriendComponent, {
      data: { profiles: this.profiles },
      width: '450px',
      height: '600px',
    });
  }
}
