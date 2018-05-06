import { Component, OnInit, ViewChild } from '@angular/core';
import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';
import { CheckInService } from '../../shared/shared-services/check-in.service';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { BookModalComponent } from '../book-modal/book-modal.component';

@Component({
  selector: 'app-checkout-request',
  templateUrl: './checkout-request.component.html',
  styleUrls: ['./checkout-request.component.css']
})
export class CheckoutRequestComponent implements OnInit {
  dataSource: any;
  currentUser: any;
  bookingDetails: any = [];
  bookingDetailsSearched = false;
  @ViewChild('currentPaginator') currentPaginator: MatPaginator;

  // @ViewChild(MatSort) sort: MatSort;
  book: any;
  columns = [
    'id',
    'bookedBy',
    'bookingDate',
    'checkIn',
    'checkOut',
    'total',
    'status',
    'operation'
  ];

  constructor(private _dbService: DbFirebaseService, private _checkInService: CheckInService, private _bookModal: MatDialog) { }


  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

  }
  ngOnInit() {


    this.currentUser = this._dbService.getStoreData('currentUser');

    this._checkInService.getAllBookings('bookingDetails').subscribe((response: any) => {
      this.bookingDetailsSearched = true;
      console.log(response);
      this.bookingDetails = response;

      this.bookingDetails.forEach(el => {
        if (el.checkingDetails.isCheckOut) {
          el['status'] = 'User is Request for Checkout and is under process for approval';
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
      const data = [];
      const bd = new Date().toLocaleDateString();
      this.bookingDetails.forEach((element, index) => {
        data.push({
          status: element['status'],
          id: index + 1,
          bookingDate: bd,
          total: element['total'],
          bookedBy: element.userId,
          roomKey: element.roomKey,
          checkingDetails: {
            checkIn: element.checkingDetails.checkIn,
            checkOut: element.checkingDetails.checkOut,
            isCheckIn: element.checkingDetails.isCheckIn,
            isCheckOut: element.checkingDetails.isCheckOut,
            approval: element.checkingDetails.approval,
          }
        });
      });
      this.dataSource =
        new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.currentPaginator;

    });


  }


  approveCheckoutRequest(bookingId) {
    const index = 2;
    this._checkInService.checkInRequest(bookingId, index);
  } openBookDetails(roomKey) {
    console.log(roomKey);

    const dialogRef = this._bookModal.open(BookModalComponent, {
      minWidth: '60%',

      data: {

        book: this.bookingDetails.find(x => x.roomKey === roomKey),
        hist: false
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);


      if (result) {
        this.approveCheckoutRequest(roomKey);
      }


    });
  }
}
