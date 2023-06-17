// * Base
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// * Components
import BaseComponent from './base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class BaseRoutingModule {}
