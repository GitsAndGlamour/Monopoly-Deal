import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import {Profile} from '../../classes/profile';
import {ProfileService} from '../../services/profile/profile.service';

@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<Profile> {
    constructor(private service: ProfileService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return await this.service.profile();
    }
}
