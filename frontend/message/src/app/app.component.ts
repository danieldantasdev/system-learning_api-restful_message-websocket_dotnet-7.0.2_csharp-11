import {Component, OnInit} from '@angular/core';
import {ChatService} from "./services/chat.service";
import {Message} from "./Models/Message";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    message: Message = new Message();
    messages: Message[] = [];

    constructor(private chatService: ChatService) {
    }

    ngOnInit(): void {
        this.chatService.retrieveMappedObject().subscribe((receivedObj: Message) => {
            this.addToInbox(receivedObj);
        });

    }

    send(): void {
        if (this.message) {
            if (this.message.user.length == 0 || this.message.user.length == 0) {
                window.alert("Both fields are required.");
                return;
            } else {
                this.chatService.broadcastMessage(this.message);
                this.message.mensagemTexto = '';
            }
        }
    }

    addToInbox(obj: Message) {
        let newObj = new Message();
        newObj.user = obj.user;
        newObj.mensagemTexto = obj.mensagemTexto;
        this.messages.push(newObj);
    }
}
