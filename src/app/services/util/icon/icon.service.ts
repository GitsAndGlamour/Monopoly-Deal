
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Injectable} from '@angular/core';

export const ICON_LIST = [
    'bot',
    'crown',
    'friend',
    'game',
    'okay',
    'public',
    'ranked',
    'unviewable',
    'viewable',
];

@Injectable({
    providedIn: 'root',
})
export class IconService {
    constructor(private registry: MatIconRegistry, private sanitizer: DomSanitizer) {
        ICON_LIST.forEach(icon => {
            this.registry.addSvgIcon(
                icon,
                this.sanitizer.bypassSecurityTrustResourceUrl(`assets/img/icons/${icon}.svg`)
            );
        });
    }
}