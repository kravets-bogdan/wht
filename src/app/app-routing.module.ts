// * Base
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', loadChildren: () => import('./base/base.module') },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
