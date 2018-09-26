import { Component, ViewContainerRef, ViewChild, AfterContentInit, ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
  <div>
      <button (click)="destroyComponent()">
        Destroy
      </button>
      <button (click)="moveComponent()">
        Move
      </button>
      <div #entry></div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  component: ComponentRef<AuthFormComponent>;

  constructor(
    private resolver: ComponentFactoryResolver
  ) {}

  ngAfterContentInit() {
    debugger
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    this.entry.createComponent(authFormFactory);
    this.component = this.entry.createComponent(authFormFactory, 0);
    this.component.instance.title = 'Create account';
    this.component.instance.submitted.subscribe(this.loginUser);
    // const component2 = this.entry.createComponent(authFormFactory);
    // const component3 = this.entry.createComponent(authFormFactory);
    // const component4 = this.entry.createComponent(authFormFactory);
  }

  destroyComponent() {
    console.log(this.component);
    this.component.destroy();
  }

  loginUser(user: User) {
    console.log('Login', user);
  }


  moveComponent() {
    debugger
    this.entry.move(this.component.hostView, 1);
  }

}
