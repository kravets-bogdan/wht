// * Base
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

// * Component
import FlterGalleryComponent from './components/filter-gallery/filter-gallery.component';
import HeaderComponent from './components/header/header.component';

// * Material
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  standalone: true,
  template: `
    <app-header></app-header>
    <app-flter-gallery
      [showFilter]="isShowFilter"
      [mobileMode]="isMobileMode"
    ></app-flter-gallery>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlterGalleryComponent,
    MatGridListModule,
    HeaderComponent,
    RouterOutlet,
  ],
})
export default class BaseComponent implements OnInit, OnDestroy {
  // * Inject
  private readonly cdr = inject(ChangeDetectorRef);
  // * local
  protected isShowFilter: boolean = false;
  protected isMobileMode: boolean = false;

  ngOnInit() {
    window.addEventListener('resize', () => this.resize());
    this.isMobileMode = window.innerWidth < 1024;
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resize);
  }

  private resize() {
    this.isMobileMode = window.innerWidth < 1024;
    if (!this.isMobileMode) {
      this.isShowFilter = false;
    }
    this.cdr.detectChanges();
  }
}
