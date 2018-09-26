import { Component, ViewContainerRef, ViewChild, AfterContentInit, ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
  
  <button (click)="destroyComponent()">
  Destroy!
</button>
    <div>
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
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    this.component = this.entry.createComponent(authFormFactory);
    console.log(this.component.instance);
    this.component.instance.title = 'Create Account';
    this.component.instance.submitted.subscribe((user: User) =>   this.loginUser(user));
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

}
