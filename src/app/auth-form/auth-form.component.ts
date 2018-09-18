import { Component, Output, EventEmitter, AfterContentInit, ContentChild, ContentChildren, QueryList } from '@angular/core';

import { User } from './auth-form.interface';
import { AuthRememberComponent } from './auth-remember.component';

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
        <div *ngIf="showMessage">
        You will be logged in for 30 days
      </div>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `
})
export class AuthFormComponent  implements AfterContentInit {
  showMessage: boolean;

  // @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;
  @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

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
  }

}
