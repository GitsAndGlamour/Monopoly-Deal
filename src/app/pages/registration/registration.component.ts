import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/firebase/auth/auth.service';
import {Profile} from '../../classes/profile';
import {ProfileService} from '../../services/profile/profile.service';
import {UsernameValidator} from '../../validators/username.validator';
import {DISPLAY_NAME_REGEX, PASSWORD_REGEX, USERNAME_REGEX} from '../../helpers/constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  tab: number;
  form: FormGroup;
  constructor(private route: ActivatedRoute, private builder: FormBuilder, private auth: AuthService, private router: Router,
              private profileService: ProfileService, private usernameValidator: UsernameValidator) {
    this.tab = route.snapshot.data.tab;
    this.form = this.builder.group({
      // Sign Up
      0: this.builder.group({
        email: new FormControl('', [
          Validators.minLength(5),
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.minLength(8),
          Validators.pattern(PASSWORD_REGEX)
        ]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(USERNAME_REGEX),
        ],
        [this.usernameValidator.usernameValidator()]
        ),
        displayName: new FormControl('', [
          Validators.minLength(4),
          Validators.pattern(DISPLAY_NAME_REGEX)]),
      }),
      // Log In
      1: this.builder.group({
        email: new FormControl('', [Validators.email]),
        password: new FormControl('', [Validators.required])
      })
    })
  }

  ngOnInit() {
  }

  toggle() {
    this.tab = this.tab ? 0 : 1;
    this.form.reset();
  }

  get signUp() {
    return this.form.get('0');
  }

  get logIn() {
    return this.form.get('1');
  }

  async submit() {
    if (this.form.errors) {
      console.log('errors');
    }
    const {email, password, displayName, username} = this.form.get(this.tab.toString()).value;
    if (this.tab === 0) {
      await this.auth.signUp(email, password, displayName);
      const profile = new Profile(Profile.blank(Object.assign({}, this.auth.localUser, {displayName, username})));
      await this.profileService.create(profile)
          .then(() => this.router.navigate(['/lobby']));
    } else {
      await this.auth.signIn(email, password).then(() => this.router.navigate(['/lobby']));
    }
  }

  log() {
    console.log(this.form);
  }
}
