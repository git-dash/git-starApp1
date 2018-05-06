import { Component, OnInit } from '@angular/core';
import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';
import { CheckInService } from '../../shared/shared-services/check-in.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { BookModalComponent } from '../book-modal/book-modal.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  histTable: MatTableDataSource<{}>;
  currentUser: any;
  bookingDetails: any = [];
  bookingHistory: any = [];
  historySearched = false;
  book: any;
  columns = [
    'id',
    'bookedBy', 'bookingDate', 'checkIn',
    'checkOut', 'total', 'status', 'operation'

  ];
  constructor(private _dbService: DbFirebaseService, private _checkInService: CheckInService, private _bookModal: MatDialog) { }

  ngOnInit() {

    this.currentUser = this._dbService.getStoreData('currentUser');



    this._checkInService.getAllBookings('bookingHistory').subscribe(response => {
      console.log(response);
      this.historySearched = true;
      this.bookingHistory = response;


      this.bookingHistory.forEach(el => {


        el['status'] = 'Guest has checked out successfully';
        el.usedServices = Object.values(el.usedServices);
        el.usedServices.forEach((serv: any, index) => {
          serv['id'] = index + 1;
        });

        el['dataSource'] = new MatTableDataSource(el.usedServices);
        el.roomDetails['guestListSrc'] = new MatTableDataSource(el.roomDetails.guestList);

      });

      this.histTable = new MatTableDataSource(this.bookingHistory);

    }, error => {
      console.log(error);

    });
  }

  openBookDetails(roomKey) {
    console.log(roomKey);

    const dialogRef = this._bookModal.open(BookModalComponent, {
      minWidth: '60%',

      data: {

        book: this.bookingHistory.find(x => x.roomKey === roomKey),
        hist: true
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result) {
        // this.approveCheckoutRequest(roomKey);
      }


    });
  }

}
