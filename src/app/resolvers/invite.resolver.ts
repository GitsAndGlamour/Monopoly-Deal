import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {InviteService} from '../services/invite/invite.service';
import {IInvite} from '../classes/invite';

@Injectable({ providedIn: 'root' })
export class InviteListResolver implements Resolve<{sent: IInvite[], received: IInvite[]}> {
    constructor(private service: InviteService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return await this.service.invites();
    }
}

