import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreStayComponent } from './pre-stay.component';
import { RouterModule, Routes } from '@angular/router';





const routes: Routes = [
  {
    path: 'booking',
    loadChildren: './booking/booking.module#BookingModule'
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
