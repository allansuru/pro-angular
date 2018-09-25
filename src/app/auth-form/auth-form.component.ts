import { Component, Output, EventEmitter, AfterContentInit, ContentChildren, QueryList, ViewChild, AfterViewInit, ViewChildren, ChangeDetectorRef, ElementRef, Renderer } from '@angular/core';

import { User } from './auth-form.interface';
import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';
import { SendInfoService } from '../subject/send-info.service';

@Component({
  selector: 'auth-form',
  styles: [`
  .email { border-color: #9f72e6; }
`],
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
      <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email" name="email" ngModel #email>
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

  constructor(
    private sendInfos: SendInfoService,
    private cd: ChangeDetectorRef,
    private renderer: Renderer,
  ) { }
  showMessage: boolean;

  @ViewChild('email') email: ElementRef;

  // @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;
  // @ViewChild(AuthMessageComponent) message:AuthMessageComponent;
  @ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent>;
  @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();


  ngAfterViewInit() {
    console.log('ElementRef: ', this.email);
    console.log('AuthMessageComponent: ', this.message);

    this.renderer.setElementAttribute(this.email.nativeElement, 'placeholder', 'Enter your email address');
    this.renderer.setElementClass(this.email.nativeElement, 'email', true);
    this.renderer.invokeElementMethod(this.email.nativeElement, 'focus');

    // this.email.nativeElement.setAttribute('placeholder', 'Enter your email address');
    // this.email.nativeElement.classList.add('email');
    // this.email.nativeElement.focus();

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
