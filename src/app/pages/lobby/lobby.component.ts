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
  new: INotification[] = [];
  all: INotification[] = [];
  notificationTypes = NotificationType;
  notificationStatuses = NotificationStatus;
  constructor(private auth: AuthService, private profileService: ProfileService, private router: Router,
              private route: ActivatedRoute, private notificationService: NotificationService, private icon: IconService) {
    this.profile = route.snapshot.data.profile;
  }

  async ngOnInit() {
    this.new = await this.notificationService.new();
    this.all = await this.notificationService.all();
    this.profileService.profileChanges().subscribe(async (value: IProfile) => {
      this.new = await this.notificationService.newFromProfile(value);
      this.all = await this.notificationService.all();
    });
  }

  async signOut() {
    await this.profileService.showOffline();
    await this.auth.signOut()
        .then(() => this.router.navigate(['/']));
  }

  async markNotificationsAsRead() {
    await this.notificationService.markAllAsRead();
    this.all = await this.notificationService.all();
  }

  showAllNotifications() {

  }

}
