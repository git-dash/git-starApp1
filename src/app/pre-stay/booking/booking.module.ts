import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ConfirmBookComponent } from './confirm-book/confirm-book.component';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassFilterPipe } from '../../shared/filters/class-filter.pipe';
import { CommonServicePipe } from '../../shared/filters/common-service.pipe';
import { SharedMaterialModule } from '../../shared/shared-material/shared-material.module';
import { SharedServicesModule } from '../../shared/shared-services/shared-services.module';
import { PricePipe } from '../../shared/filters/price.pipe';
import { RoomTypePipe } from '../../shared/filters/room-type.pipe';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { BookGuard } from '../../shared/guards/book.guard';
import { RoomPreferencePipe } from '../../shared/filters/preference/room-preference.pipe';
import { ServicePreferencePipe } from '../../shared/filters/preference/service-preference.pipe';
import { QrcodeComponent } from './confirm-book/qrcode/qrcode.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';



const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: 'search'
  },
  {
    path: 'search',
    // loadChildren: './booking/booking.module/Booking#Module'
    component: SearchComponent
  },
  {
    path: 'confirm-book',
    // loadChildren: './booking/booking.module/Booking#Module'
    component: ConfirmBookComponent, canActivate: [AuthGuard, BookGuard]
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    // SharedServicesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
    , NgxQRCodeModule
  ],
  entryComponents: [QrcodeComponent]
  , declarations: [BookingComponent, SearchComponent, ConfirmBookComponent, ClassFilterPipe, CommonServicePipe, PricePipe
    , RoomTypePipe,
    RoomPreferencePipe, ServicePreferencePipe, QrcodeComponent
  ],
  providers: [AuthGuard, BookGuard]
})
export class BookingModule { }
