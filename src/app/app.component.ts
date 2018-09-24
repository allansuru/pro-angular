import { Component } from '@angular/core';

import { User } from './auth-form/auth-form.interface';
import { SendInfoService } from './subject/send-info.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <auth-form
        (submitted)="createUser($event)">
        <h3>Create account </h3>
        <button type="submit">
        Join us
      </button>
      </auth-form>
      <auth-form
        (submitted)="loginUser($event)">
        <h3>Login</h3>
        <auth-remember (checked)="rememberUser($event)"></auth-remember>
        <button type="submit">
        Login
      </button>
      </auth-form>
  </div>

  `
})
export class AppComponent {
  constructor(private getInfos: SendInfoService) {

    this.getInfos.getInfos().subscribe(infos => {
      this.verificaExistente(infos);
      this.lstInfos.push(infos);
      console.log('lista de logins consolidada: ', this.lstInfos);
    });
  }

  // tslint:disable-next-line:no-inferrable-types
  rememberMe: boolean = false;
  lstInfos: any[] = [];

  createUser(user: User) {
    console.log('Create account', user);
  }

  loginUser(user: User) {
    console.log('Login', user, this.rememberMe);
  }
  rememberUser(remember: boolean) {
    this.rememberMe = remember;
  }

  verificaExistente(daVez) {
    let index = null;
    if (this.lstInfos.length > 0) {
   this.lstInfos.map((item, i) => {
           if (item.infos.email === daVez.infos.email ) {
              index = i;
           }
        });

        if (index !== null) {
          this.lstInfos.splice(index, 1);
          index = null;
        }
    }
  }
}