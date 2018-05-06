import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreStayComponent } from './pre-stay.component';
import { RouterModule, Routes } from '@angular/router';





const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: 'booking'
  },
  {
    path: 'booking',
    loadChildren: './booking/booking.module#BookingModule'
    // component: PreStayComponent,
    // children: [
    //   {
    //     path: '', pathMatch: 'full',
    //     redirectTo: 'search'
    //   },
    //   {
    //     path: 'search',
    //     // loadChildren: './booking/booking.module/Booking#Module'
    //     component: SearchComponent
    //   },
    //   {
    //     path: 'confirm-book',
    //     // loadChildren: './booking/booking.module/Booking#Module'
    //     component: ConfirmBookComponent
    //   }
    // ]

  }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreStayComponent]
})
export class PreStayModule { }
