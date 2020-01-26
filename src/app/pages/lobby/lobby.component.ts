import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  async signOut() {
    await this.auth.signOut();
  }

}
