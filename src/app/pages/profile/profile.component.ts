import {Component, OnInit} from '@angular/core';
import {Profile} from '../../classes/profile';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  constructor(private route: ActivatedRoute) {
    this.profile = this.route.parent.snapshot.data.profile;
    console.log(this.profile);
  }

  ngOnInit() {
  }
}
