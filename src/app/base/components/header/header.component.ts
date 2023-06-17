// * Base
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  template: `
    <header>
      <h1>Hello Wht.agency</h1>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent {}
