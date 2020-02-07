import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from '../material.module';
import {DeckComponent} from './game/deck/deck/deck.component';
import { MenuHeaderComponent } from './menus/menu-header/menu-header.component';
import { MenuFooterComponent } from './menus/menu-footer/menu-footer.component';
import {MenuComponent} from './menus/menu.component';

@NgModule({
    declarations: [
        DeckComponent,
        MenuHeaderComponent,
        MenuFooterComponent,
        MenuComponent,
    ],
    imports: [
        BrowserModule,
        MaterialModule,
    ],
    exports: [
        DeckComponent,
        MenuComponent
    ]
})
export class ComponentModule { }
