import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from '../material.module';
import {DeckComponent} from './game/deck/deck/deck.component';
import { MenuHeaderComponent } from './menus/menu-header/menu-header.component';
import { MenuFooterComponent } from './menus/menu-footer/menu-footer.component';
import {MenuComponent} from './menus/menu.component';
import { ChatComponent } from './chat/chat.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        DeckComponent,
        MenuHeaderComponent,
        MenuFooterComponent,
        MenuComponent,
        ChatComponent,
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    exports: [
        DeckComponent,
        MenuComponent,
        ChatComponent
    ]
})
export class ComponentModule { }
