import { Component, Output, EventEmitter, AfterContentInit, ContentChildren, QueryList, ViewChild, AfterViewInit, ViewChildren, ChangeDetectorRef } from '@angular/core';

import { User } from './auth-form.interface';
import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';
import { SendInfoService } from '../subject/send-info.service';

@Component({
  selector: 'auth-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
      <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email" name="email" ngModel>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <ng-content select="auth-remember"></ng-content>
        <auth-message
        [style.display]="(showMessage ? 'inherit' : 'none')">
      </auth-message>
      <auth-message
        [style.display]="(showMessage ? 'inherit' : 'none')">
      </auth-message>
      <auth-message
        [style.display]="(showMessage ? 'inherit' : 'none')">
      </auth-message>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `
})
export class AuthFormComponent  implements AfterContentInit, AfterViewInit {

  constructor(
    private sendInfos: SendInfoService,
    private cd: ChangeDetectorRef
  ) { }
  showMessage: boolean;

  // @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;
  // @ViewChild(AuthMessageComponent) message:AuthMessageComponent;
  @ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent>;
  @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();


  ngAfterViewInit() {
    console.log(this.message);

    if (this.message) {
 
      this.message.forEach((message ) => {
        message.days = 30;
      });
      // se usar aqui, pra nao dar erro preciso usar o detectChanges!
      this.cd.detectChanges();
    }
  }

  ngAfterContentInit() {
 
    if (this.remember) {

      // CHILD
      // this.remember.checked.subscribe((checked: boolean) =>  {
      //   console.log
      //   debugger
      //   this.showMessage = checked;
      // });
       // CHILDREN
      this.remember.forEach((item) => {
        item.checked.subscribe((checked: boolean) => {
          console.log('Checked: ', checked);
          this.showMessage = checked;
        });
      });
    }
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
    this.sendInfos.sendInfos(value);
  }

}
