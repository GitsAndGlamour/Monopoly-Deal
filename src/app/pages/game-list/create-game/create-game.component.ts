import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {User} from 'firebase';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
  form: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredFriends: Observable<string[]>;
  friends: User[] = [];
  allFriends: User[];
  @ViewChild('friendInput', {static: false}) friendInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(private _bottomSheetRef: MatBottomSheetRef<CreateGameComponent>, private builder: FormBuilder,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: {index: number, friends: User[]}) {
    this.allFriends = data.friends || [];
    this.form = this.builder.group({
      name: `Game #${data.index}`,
      seats: 2,
      bots: 0,
      invitees: '',
      public: true,
      viewable: true,
      ranked: false,
      friends: false,
    })
  }

  ngOnInit() {
  }

  submit(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  add(event: MatChipInputEvent): void {
    // Add friend only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {

      this.form.get('invitees').setValue(null);
    }
  }

  remove(friend: User): void {
    const index = this.friends.indexOf(friend);

    if (index >= 0) {
      this.friends.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.friends.push(event.option.value);
    this.friendInput.nativeElement.value = '';
    this.form.get('invitees').setValue(null);
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.allFriends.filter(friend => friend.displayName.toLowerCase().indexOf(filterValue) === 0);
  }
}

