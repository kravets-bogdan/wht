// * Base
import { Component, EventEmitter, Input, Output } from '@angular/core';

// * Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  imports: [MatIconModule, MatButtonModule],
})
export default class BurgerComponent {
  // * Inputs
  @Input() isOpen: boolean = false;
  // * Outputs
  @Output() toggle = new EventEmitter<boolean>();
}
