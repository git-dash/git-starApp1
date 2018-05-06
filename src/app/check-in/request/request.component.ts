import { Component, OnInit } from '@angular/core';
import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';
import { CheckInService } from '../../shared/shared-services/check-in.service';
import { FeedbackComponent } from './feedback/feedback.component';
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment';
import { ScanQrcodeComponent } from './scan-qrcode/scan-qrcode.component';
// import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})


export class RequestComponent implements OnInit {



  currentUser: any;
  bookingDetails: any = [];
  bookingHistory: any = [];
  book: any;
  data2 = environment.data2;
  constructor(private _dbService: DbFirebaseService, private _checkInService: CheckInService, private _feedback: MatDialog) {

  }



  ngOnInit() {

    this.currentUser = this._dbService.getStoreData('currentUser');

    this._dbService.getDbData('bookingDetails', 'userId', this.currentUser.email).subscribe(response => {
      console.log(response);
      this.bookingDetails = response;

      this.bookingDetails.forEach(el => {
        if (el.checkingDetails.isCheckOut) {
          el['status'] = 'User is Requested for Checkout and is under process for approval';
        } else if (!el.checkingDetails.isCheckIn) {
          el['status'] = 'User is yet to Check-In';
        } else if (el.checkingDetails.isCheckIn) {
          el['status'] = 'User is  Checked-In and staying in hotel';
        }
        let total = 0;

        el.usedServices = Object.values(el.usedServices);
        el.usedServices.forEach((serv: any, index) => {
          total += serv.cost;
          serv['id'] = index + 1;
        });
        el['total'] = total;



      });
    });


  }

  checkingStatus(bookingId, ischeckIn) {

    if (ischeckIn) {

      const dialogRef = this._feedback.open(ScanQrcodeComponent, {
        width: 'fit-content',
        data: { roomKey: bookingId }
      });
      dialogRef.afterClosed().subscribe(result => {

        console.log(result);
        if (result === true) {
          this._checkInService.checkInRequest(bookingId, ischeckIn ? 0 : 1);
        }
      });

    } else {
      this._checkInService.checkInRequest(bookingId, ischeckIn ? 0 : 1);
    }

  }
  successfulCheckout(index) {
    console.log(index);


    const roomAvail = this.bookingDetails[index].checkingDetails.checkIn + '-'
      + this.bookingDetails[index].checkingDetails.checkOut;
    const total = this.bookingDetails[index].total;

    const dialogRef = this._feedback.open(FeedbackComponent, {
      width: '350px',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);

      // this.animal = result;
      // update after successful

      this._checkInService.successfulCheckout(
        this.bookingDetails[index].roomKey // room id
        , this.bookingDetails[index].roomDetails.id // room id
        , roomAvail,
        total,
        result.message, result.rating
      );
    });
  }


}
