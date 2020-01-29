import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from '../material.module';
import {DeckComponent} from './game/deck/deck/deck.component';

@NgModule({
    declarations: [
        DeckComponent,
    ],
    imports: [
        BrowserModule,
        MaterialModule,
    ],
    exports: [
        DeckComponent
    ]
})
export class ComponentModule { }
