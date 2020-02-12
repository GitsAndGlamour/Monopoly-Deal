import * as firebase from 'firebase';
import {Component, OnInit, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {ProfileService} from '../../services/profile/profile.service';
import {ChatService} from '../../services/chat/chat.service';
import {Chat, ChatLevel, IChat, IMessage} from '../../classes/message';
import {FormControl, Validators} from '@angular/forms';
import Timestamp = firebase.firestore.Timestamp;
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  chats: IChat[] = [];
  lobby: IChat;
  selected: Chat;
  messageCtrl = new FormControl('', [
    Validators.minLength(1)
  ]);
  @ViewChild('chatWindow', {static: true}) private scrollContainer: ElementRef;

  constructor(private profileService: ProfileService, private chatService: ChatService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.selected = new Chat(await this.chatService.chat(this.route.snapshot.params.game || 'lobby'));
    console.log(this.selected);
    this.chatService.chatChanges().subscribe(async changes => {
      this.lobby = await this.chatService.lobby();
      this.chats = await this.chatService.chats();
      this.selected = new Chat(await this.chatService.chat(this.selected ? this.selected.id : 'lobby'));
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  select(chat: IChat) {
    this.selected = new Chat(chat);
  }

  get games() {
    return this.chats.filter(chat => chat.level === ChatLevel.GAME);
  }

  get rooms() {
    return this.chats.filter(chat => chat.level === ChatLevel.ROOM);
  }

  async send() {
    const profile = await this.profileService.profile();
    const id = await this.chatService.id();
    const message: IMessage = {
      from: profile, fromId: profile.uid, id, sent: new Date(), value: this.messageCtrl.value, read: new Map<string, boolean>()
    };
    this.selected.participants.forEach(player => message.read.set(player.uid, false));
    await this.chatService.sendMessage(this.selected.id, message);
    this.messageCtrl.reset();
    this.scrollToBottom();
  }

  getDate(sent: Date | Timestamp) {
    if (sent) {
      return sent instanceof Date ? sent : sent.toDate();
    }
    return new Date();
  }

  async onKeyPress(event) {
    if (event.key === "Enter") {
      await this.send();
    }
  }

  scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.log(err);
    }
  }
}
