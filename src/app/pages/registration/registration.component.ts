import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  tab: number;
  form: FormGroup;
  constructor(private route: ActivatedRoute, private builder: FormBuilder, private auth: AuthService, private router: Router) {
    this.tab = route.snapshot.data.tab;
    this.form = this.builder.group({
      0: this.builder.group({email: '', display: '', password: ''}),
      1: this.builder.group({email: '', password: ''})
    })
  }

  ngOnInit() {
  }

  toggle() {
    this.tab = this.tab ? 0 : 1;
  }

  async submit() {
    const {email, password, display} = this.form.get(this.tab.toString()).value;
    if (this.tab === 0) {
      await this.auth.signUp(email, password, display).then(() => this.router.navigate(['/lobby']));
    } else {
      await this.auth.signIn(email, password).then(() => this.router.navigate(['/lobby']));;
    }
  }

}
