import {Injectable} from '@angular/core';
import {GameService} from '../services/game/game.service';
import {ProfileService} from '../services/profile/profile.service';
import {NotificationService} from '../services/notification/notification.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export abstract class StatusTrigger {
    constructor(protected gameService: GameService, protected profileService: ProfileService,
                protected notificationService: NotificationService, protected router: Router) { }

    execute(inputs: any) {
        this.before(inputs).then(async result => {
            await this.after(result);
        });
    }

    abstract async before(inputs: any): Promise<any>;

    abstract async after(before: any): Promise<any>;
}
