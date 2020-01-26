import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';
import {ProfileService} from '../services/profile/profile.service';

@Injectable({
    providedIn: 'root'
})
export class UsernameValidator {
    constructor(private service: ProfileService) {}

    searchUsername(text) {
        console.log(text);
        // debounce
        return timer(2000)
            .pipe(
                switchMap(() => {
                    // Check if username is available
                    return this.service.usernameExists(text.toLowerCase());
                })
            );
    }

    usernameValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            return this.searchUsername(control.value.toLowerCase())
                .pipe(
                    map(res => {
                        console.log(res);
                        // if username is already taken
                        if (res.length > 0) {
                            // return error
                            return { 'usernameTaken': true};
                        }
                    })
                );
        };

    }

}
