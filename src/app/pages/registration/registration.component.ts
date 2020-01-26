import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/firebase/auth/auth.service';
import {StoreService} from '../../services/firebase/store/store.service';
import {Profile} from '../../classes/profile';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  tab: number;
  form: FormGroup;
  constructor(private route: ActivatedRoute, private builder: FormBuilder, private auth: AuthService, private router: Router,
              private profileStorage: StoreService<Profile>) {
    this.tab = route.snapshot.data.tab;
    this.form = this.builder.group({
      0: this.builder.group({email: '', password: '', displayName: '', username: ''}),
      1: this.builder.group({email: '', password: ''})
    })
  }

  ngOnInit() {
  }

  toggle() {
    this.tab = this.tab ? 0 : 1;
    this.form.reset();
  }

  async submit() {
    const {email, password, displayName, username} = this.form.get(this.tab.toString()).value;
    if (this.tab === 0) {
      await this.auth.signUp(email, password, displayName)
          .then(() => {
            const user = this.auth.localUser;
            this.profileStorage.addDocument('profiles', user.uid, Profile.blank(user, username.toLowerCase()));
          })
          .then(() => this.router.navigate(['/lobby']));
    } else {
      await this.auth.signIn(email, password).then(() => this.router.navigate(['/lobby']));
    }
  }

  async validateSignUpInputs(email, password, displayName, username) {
    if (displayName && username) {
      const isValidUsername = await this.validateUsername(username);
      const isValidDisplayName = await this.validateDisplayName(displayName);
      const isValidLogin = await this.validateLogInInputs(email, password);
      return isValidUsername && isValidDisplayName && isValidLogin;
    } else {
      alert('Please fill out all fields.');
      return false;
    }
  }

  validateLogInInputs(email, password) {
    if (email && password) {
      const isValidEmail = this.validateEmail(email);
      const isValidPassword = this.validatePassword(password);
      if(isValidEmail && isValidPassword) {
        return true;
      } else {
        alert('Please enter a valid e-mail address and password.');
      }
    } else {
      alert('Please enter an e-mail address and password.');
      return false;
    }
  }

  async validateUsername(value: string): Promise<boolean> {
    const regExValid = RegExp(`([a-zA-z0-9]{3,25})`).test(value);
    if (regExValid) {
      const results = await this.profileStorage.getCollectionWhere('profiles', { fieldPath: 'username', opStr: '==', value });
      if(!results || !results.length) {
        return true;
      } else {
        alert('The username provided is already taken.');
        return false;
      }
    }
    alert('Your username is not valid. Alphanumeric characters only. The username must be between 4 and 24 characters.')
    return false;
  }

  validateEmail(value: string): boolean {
    if (!!RegExp(``).test(value)) {
      return true;
    }
    alert('Your e-mail address must be valid to continue. Please try again.');
    return false;
  }

  validatePassword(value: string): boolean {
    if (!!RegExp(``).test(value)) {
      return true;
    }
    alert('Password should be at least one capital letter, one small letter, one number and 8 character length.');
    return false;
  }

  async validateDisplayName(value: string): Promise<boolean> {
    if (!!RegExp(``).test(value)) {
      if (!RegExp(``).test(value)) {
        return true;
      }
      alert('Bad words are not allowed.');
      return false;
    }
    alert('Display name must contain at least 4 and no more than 24 characters. A space in between is optional. Bad words are not allowed.');
    return false;
  }
}
