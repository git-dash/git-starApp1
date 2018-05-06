import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatDatepickerModule,
  MatIconModule,
  MatCardTitle,
  MatAutocompleteModule,
  MatInputModule,
  MatNativeDateModule,
  MatStepperModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatRadioModule,
  MatToolbarModule,
  MatTabsModule,
  MatGridListModule,
  MatTooltipModule,
  MatExpansionModule,
  MatTableModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatDialogModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDividerModule
} from '@angular/material';
import { StarComponent } from './star/star.component';
import { GuestListComponent } from './guest-list/guest-list.component';
import { BillingListComponent } from './billing-list/billing-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from 'ngx-bootstrap';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatRadioModule,
    MatToolbarModule,
    MatTabsModule,
    MatGridListModule,
    MatTooltipModule,
    MatExpansionModule,
    MatTableModule,
    CarouselModule.forRoot(),
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule

  ],
  entryComponents: [BookingModalComponent],
  declarations: [StarComponent, GuestListComponent, BillingListComponent, CarouselComponent, BookingListComponent, BookingModalComponent]
  , exports: [
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatRadioModule,
    MatToolbarModule,
    MatTabsModule,
    MatGridListModule,
    MatTooltipModule,
    MatExpansionModule,
    StarComponent,
    BillingListComponent,
    GuestListComponent,
    CarouselComponent,
    MatTableModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    CarouselModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    BookingListComponent, BookingModalComponent
  ]

})
export class SharedMaterialModule { }
