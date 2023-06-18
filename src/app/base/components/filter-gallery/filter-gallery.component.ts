// * Base
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  Input,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

// * Forms
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

// * Services
import CatApiService from 'src/app/services/catapi.service';

// * Components
import BurgerComponent from '../burger/burger.component';

// * Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

const material = [
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatButtonModule,
  MatSelectModule,
  MatSliderModule,
  MatInputModule,
];

// * Types
import { catsBreeds } from 'src/app/types/catsBreeds.types';
import { Items } from '../../../types/item.types';

type PageDirection = 'previous' | 'next';

@Component({
  standalone: true,
  selector: 'app-flter-gallery',
  templateUrl: './filter-gallery.component.html',
  styleUrls: ['./filter-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatApiService],
  imports: [
    ReactiveFormsModule,
    BurgerComponent,
    FormsModule,
    NgFor,
    NgIf,
    ...material,
  ],
})
export default class FlterGalleryComponent implements OnInit {
  // * Inputs
  @Input('showFilter') isShowFilter: boolean = false;
  @Input('mobileMode') isMobileMode: boolean = false;
  // * Inject
  private readonly catApiService = inject(CatApiService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  // * local
  protected breeds: catsBreeds[] = [];
  protected loading: boolean = false;
  protected selectBreed: string = '';
  protected pagedItems: Items[] = [];
  protected limit: number = 10;
  protected list: Items[] = [];
  protected form!: FormGroup;
  protected currentPage = 1;

  ngOnInit() {
    this.initForm();
    this.getItems();
    this.getBreeds();
  }

  protected changePage(direction: PageDirection) {
    if (direction === 'previous' && this.currentPage > 1) {
      this.currentPage--;
    } else {
      this.currentPage++;
    }
    this.itemsOnPage();
  }

  protected getItems() {
    this.loading = true;
    this.catApiService
      .getItems(this.form.value.limit, this.form.value.breed)
      .subscribe({
        next: (response) => {
          if (this.limit > response.length) {
            this.openSnackBar(response.length);
            this.limit = response.length;
          }
          this.currentPage = 1;
          this.list = response;
          this.itemsOnPage();
          this.loading = this.isShowFilter = false;
          this.cdr.detectChanges();
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
          this.loading = this.isShowFilter = false;
          this.cdr.detectChanges();
        },
      });
  }

  private itemsOnPage() {
    const startIndex = (this.currentPage - 1) * 4;
    this.pagedItems = this.list.slice(startIndex, startIndex + 4);
  }

  private openSnackBar(limit: number) {
    this._snackBar.open(
      `Sorry, we only have ${limit} photos of the cats :( `,
      'Close',
      {
        duration: 5000,
      }
    );
  }

  private getBreeds() {
    this.catApiService.getBreeds().subscribe({
      next: (response) => {
        this.breeds = response;
      },
      error: (errorResponse) => {
        console.log('errorResponse: ', errorResponse);
      },
    });
  }

  private initForm() {
    this.form = this.fb.group({
      limit: [this.limit],
      breed: [''],
    });
  }
}
