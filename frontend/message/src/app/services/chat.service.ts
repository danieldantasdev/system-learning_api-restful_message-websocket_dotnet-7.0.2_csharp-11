import {Injectable, OnInit, Signal} from '@angular/core';
import * as signalR from '@microsoft/signalr';          // import signalR
import {HttpClient} from '@angular/common/http';
import {Message} from '../Models/Message';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private readonly connection = new signalR.HubConnectionBuilder().withUrl(environment.hubConnectionURL)
    // private readonly connection = new signalR.HubConnectionBuilder().withUrl(environment.BASE_URL + "/chatsocket")
        .configureLogging(signalR.LogLevel.Information)
        .build();
    private readonly _url: string = environment.broadcastURL;
    private readonly _message: Message = new Message();
    private readonly _subject: Subject<Message> = new Subject<Message>();

    constructor(private http: HttpClient) {
        this.connection.onclose(async () => {
            await this.start();
        });
        this.connection.on("ReceiveOne", (user: any, message: any) => {
            this.mapReceivedMessage(user, message);
        });
        this.start();
    }


    public async start() {
        try {
            await this.connection.start();
            console.log("connected");
        } catch (err) {
            console.log(err);
            setTimeout(() => this.start(), 5000);
        }
    }

    private mapReceivedMessage(user: string, message: string): void {
        this._message.user = user;
        this._message.mensagemTexto = message;
        this._subject.next(this._message);
    }

    public broadcastMessage(msgDto: any) {
        this.http.post(this._url, msgDto).subscribe(data => console.log(data));
        // this.http.post(this._url + "/Chat/send", msgDto).subscribe(data => console.log(data));
        // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
    }

    public retrieveMappedObject(): Observable<Message> {
        return this._subject.asObservable();
    }
}
