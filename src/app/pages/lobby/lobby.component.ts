import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/firebase/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../../services/profile/profile.service';
import {IProfile} from '../../classes/profile';
import {NotificationService} from '../../services/notification/notification.service';
import {INotification, NotificationStatus, NotificationType} from '../../classes/notification';
import {IconService} from '../../services/util/icon/icon.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  profile: IProfile;
  notifications: INotification[] = [];
  notificationTypes = NotificationType;
  constructor(private auth: AuthService, private profileService: ProfileService, private router: Router,
              private route: ActivatedRoute, private notificationService: NotificationService, private icon: IconService) {
    this.profile = route.snapshot.data.profile;
  }

  async ngOnInit() {
    this.notifications = await this.notificationService.new();
    this.profileService.profileChanges().subscribe(async (value: IProfile) => {
      this.notifications = await this.notificationService.newFromProfile(value);
    });
  }

  async signOut() {
    await this.profileService.showOffline();
    await this.auth.signOut()
        .then(() => this.router.navigate(['/']));
  }

}
