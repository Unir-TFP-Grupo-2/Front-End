import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root' 
})
export class MessageService {
  constructor(private _http: HttpClient) { }
  sendMessage(body: any) {
    return this._http.post('http://localhost:3000/api/email/send', body); 
  }
}