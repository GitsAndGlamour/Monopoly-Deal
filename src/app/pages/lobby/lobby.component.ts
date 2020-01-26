import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/firebase/auth/auth.service';
import {StoreService} from '../../services/firebase/store/store.service';
import {Profile} from '../../classes/profile';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor(private auth: AuthService, private profileStorage: StoreService<Profile>, private router: Router) { }

  ngOnInit() {
  }

  async signOut() {
    await this.profileStorage.updateDocument('profiles', this.auth.localUser.uid, { online: false });
    await this.auth.signOut().then(() => this.router.navigate(['/']));
  }

}
