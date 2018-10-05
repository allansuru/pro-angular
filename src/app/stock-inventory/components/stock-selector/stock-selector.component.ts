import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'stock-selector',
  styleUrls: ['stock-selector.component.scss'],
  template: `
    <div class="stock-selector" [formGroup]="parent">
    <div formGroupName="selector">
    <input 
    type="text"
    placeholder="quant"
    formControlName="quantity">
    </div>

    </div>
  `
})
export class StockSelectorComponent {
  @Input()
  parent: FormGroup;
}