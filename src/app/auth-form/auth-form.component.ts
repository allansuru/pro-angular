import { Component, Output, EventEmitter, AfterContentInit, ContentChild, ContentChildren, QueryList, ViewChild, AfterViewInit } from '@angular/core';

import { User } from './auth-form.interface';
import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';

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
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `
})
export class AuthFormComponent  implements AfterContentInit, AfterViewInit {
  showMessage: boolean;

  // @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;
  @ViewChild(AuthMessageComponent) message: AuthMessageComponent;
  @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();


  ngAfterViewInit() {
    console.log(this.message);
     // Se eu mudar o days do AuthMessageComponent aqui, me gera um exception,
     // Devo fazer a mudanca no ngAfterContentInit, conforme exemplo!
    // this.message.days = 30;
  }

  ngAfterContentInit() {
    if (this.message) {
      this.message.days = 30;
    }
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
  }

}
