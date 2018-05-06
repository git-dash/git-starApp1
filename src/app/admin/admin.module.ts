import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history/history.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CheckoutRequestComponent } from './checkout-request/checkout-request.component';
import { BookModalComponent } from './book-modal/book-modal.component';


const routes: Routes = [
  // {
  //   path: '', pathMatch: 'full',
  //   redirectTo: 'chk-req'
  // },
  {
    path: 'history',
    // loadChildren: './booking/booking.module#BookingModule'
    component: HistoryComponent,
    canActivate: [],
    // outlet : 'testView'

  },
  {
    path: 'chk-req',
    // loadChildren: './booking/booking.module#BookingModule'
    component: CheckoutRequestComponent,
    canActivate: []
  }

];
@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [BookModalComponent],
  declarations: [AdminComponent, HistoryComponent, CheckoutRequestComponent, HotelListComponent, BookModalComponent]
})
export class AdminModule { }
