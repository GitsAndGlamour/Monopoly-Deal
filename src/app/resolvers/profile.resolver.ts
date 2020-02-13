import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {IProfile, IProfileReadOnly} from '../classes/profile';
import {ProfileService} from '../services/profile/profile.service';
import {FriendProfileService} from '../services/profile/friend-profile.service';

@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<IProfile> {
    constructor(private service: ProfileService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return await this.service.profile();
    }
}

@Injectable({ providedIn: 'root' })
export class ProfileListResolver implements Resolve<IProfile[]> {
    constructor(private service: ProfileService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return await this.service.profiles();
    }
}

@Injectable({ providedIn: 'root' })
export class FriendListResolver implements Resolve<IProfileReadOnly[]> {
    constructor(private service: FriendProfileService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return await this.service.friends();
    }
}

@Injectable({ providedIn: 'root' })
export class OnlineListResolver implements Resolve<IProfileReadOnly[]> {
    constructor(private service: ProfileService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return await this.service.online();
    }
}
