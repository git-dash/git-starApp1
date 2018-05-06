import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history/history.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';
import { RequestComponent } from './request/request.component';
import { FeedbackComponent } from './request/feedback/feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';
import { ScanQrcodeComponent } from './request/scan-qrcode/scan-qrcode.component';
const routes: Routes = [
  // {
  //   path: '', pathMatch: 'full',
  //   redirectTo: 'request'
  // },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'request',
    component: RequestComponent
  },

];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    NgQRCodeReaderModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [FeedbackComponent, ScanQrcodeComponent],
  declarations: [HistoryComponent, RequestComponent, FeedbackComponent, ScanQrcodeComponent]
})
export class CheckInModule { }
