import { Injectable, OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../auth-form/auth-form.interface';

@Injectable()
export class SendInfoService {
  
  private subject = new Subject<any>();

  clearInfos() {
    this.subject.next();
  }

  getInfos(): Observable<User> {
    return this.subject.asObservable();
  }

  sendInfos(infos: User) {
    this.subject.next({ infos: infos });
  }
}
