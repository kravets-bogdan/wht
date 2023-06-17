// * Base
import BaseRoutingModule from './base-routing.module';
import { NgModule } from '@angular/core';

// * Component
import BaseComponent from './base.component';

@NgModule({
  imports: [BaseComponent, BaseRoutingModule],
})
export default class BaseModule {}
