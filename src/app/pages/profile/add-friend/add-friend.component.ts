import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {IProfileReadOnly} from '../../../classes/profile';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ProfileService} from '../../../services/profile/profile.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  profileCtrl = new FormControl();
  filteredProfiles: Observable<IProfileReadOnly[]>;
  profiles: IProfileReadOnly[] = [];
  allProfiles: IProfileReadOnly[] = this.data.profiles;

  @ViewChild('profileInput', {static: false}) profileInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: {profiles: IProfileReadOnly[]}, private service: ProfileService,
      public dialog: MatDialog
  ) {
    console.log(this.data.profiles);
    this.filteredProfiles = this.profileCtrl.valueChanges.pipe(
        startWith(null),
        map((profile: IProfileReadOnly | null) => profile ? this._filter(profile) : this.allProfiles));
  }

  remove(profile: IProfileReadOnly): void {
    const index = this.profiles.indexOf(profile);

    if (index >= 0) {
      this.profiles.splice(index, 1);
    }
  }

  selected(profile: IProfileReadOnly): void {
    if (!this.profiles.some(selected => selected.username === profile.username)) {
      this.profiles.push(profile);
      this.profileInput.nativeElement.value = '';
      this.profileCtrl.setValue(null);
    }
  }

  private _filter(value: IProfileReadOnly): IProfileReadOnly[] {
    if (value) {
      const displayNameFilterValue = value.displayName ? value.displayName.toLowerCase() : '';
      const usernameFilterValue = value.username ? value.username.toLowerCase() : '';
      return this.allProfiles.filter(profile => (
          profile.displayName.toLowerCase().indexOf(displayNameFilterValue) === 0 ||
          profile.username.toLowerCase().indexOf(usernameFilterValue) === 0) &&
          !this.profiles.some(selected => profile.username === selected.username)
      );
    }
  }

  ngOnInit(): void {
  }

  async submit() {
    console.log(this.profiles);
    await this.service.addFriends(this.profiles.map(profile => profile.uid));
    this.dialog.closeAll();
  }

}
