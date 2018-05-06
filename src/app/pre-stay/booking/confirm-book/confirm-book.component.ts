import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DbFirebaseService } from '../../../shared/shared-services/db-firebase.service';
// import { MatTableDataSource } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { FormArray } from '@angular/forms/src/model';
import { MatDialog } from '@angular/material';
import { QrcodeComponent } from './qrcode/qrcode.component';

@Component({
  selector: 'app-confirm-book',
  templateUrl: './confirm-book.component.html',
  styleUrls: ['./confirm-book.component.css']
})
export class ConfirmBookComponent implements OnInit {
  // datasource: any;
  roomKeyMessage: string;
  searchDetails: any;
  currentUser: any;
  finalRoom: any;
  finalHotel: any;
  cabForm: FormGroup;
  cabOptions = [
    { 'cost': 0, 'label': 'Not Required', },
    { 'cost': 600, 'label': 'From Airport', },
    { 'cost': 300, 'label': 'From Railway Station', },

  ];
  favoriteSeason: string;

  seasons = [
    { 'cost': 0, 'label': 'Not Required', },
    { 'cost': 600, 'label': 'From Airport', },
    { 'cost': 300, 'label': 'From Railway Station', },
  ];
  commonService = environment.filterData.commonService;
  //  [
  //   { selected: false, value: 0, symbol: 'wifi.png', label: 'Wifi' },
  //   { selected: false, value: 1, symbol: 'dumbbell.png', label: 'Gym' },
  //   { selected: false, value: 2, symbol: 'food.png', label: 'Breakfast' },
  //   { selected: false, value: 3, symbol: 'swimming-pool.png', label: 'Swimming Pool' },
  //   { selected: false, value: 4, symbol: 'lotus-position.png', label: 'Yoga Classes' },
  //   { selected: false, value: 5, symbol: 'pets.png', label: 'Pet' }

  // ];
  guestList = [
    { id: 1, name: 'madhukar choure', phone: '1231231231', age: 24 },
    { id: 2, name: 'snehal mane', phone: '1231231231', age: 24 },
    { id: 3, name: 'shubhangi', phone: '1231231231', age: 24 },
    { id: 4, name: 'shirish bhuruk', phone: '1231231231', age: 24 },
  ];
  displayColumns = ['age', 'name', 'phone', 'id'];
  constructor(private _router: Router, private _formBuilder: FormBuilder, private _dbService: DbFirebaseService,
    private _dialog: MatDialog) {

    this.cabForm = this._formBuilder.group({
      'needCab': [this.seasons[0], Validators.required],
      'guestList': this._formBuilder.array([])
      // this._formBuilder.array([
      //   {
      //     'name': [null, Validators.required],
      //     'age': [null, Validators.required],
      //     'phone': [null],
      //   },
      //   {
      //     'name': [null, Validators.required],
      //     'age': [null, Validators.required],
      //     'phone': [null],
      //   },
      // ]
      // )
    });


    this.finalHotel = this._dbService.getStoreData('finalHotel');
    this.finalRoom = this._dbService.getStoreData('finalRoom');
    this.currentUser = this._dbService.getStoreData('currentUser');
    this.searchDetails = this._dbService.getStoreData('searchDetails');
    const total = this.searchDetails.maxPeople;
    const guests = <FormArray>this.cabForm.controls['guestList'];
    for (let i = 0; i < total; i++) {
      guests.push(
        this._formBuilder.group({

          name: [null, Validators.required],
          age: [null, [Validators.required, Validators.min(1), Validators.max(150),
          Validators.pattern(/[0-9]$/)]],
          phone: [null, [Validators.required,
          Validators.pattern(/[0-9]$/), Validators.minLength(10), Validators.maxLength(10)]],
          // id: [(i + 1)],

        })
      );
    }
    console.log(this.cabForm);


  }

  ngOnInit() {


    // if (this.finalRoom === null) {// && !this.finalRoom) {
    //   this._router.navigate(['hotel/booking/search']);
    // }
  }

  book(cabFormValue: any) {
    console.log(cabFormValue);


    const guestList = cabFormValue.guestList;
    guestList.forEach((element, index) => {
      element.phone = element.phone === null ? '-' : element.phone;
      element.id = index + 1;
    });


    const services = [
      { name: 'Room Charges', cost: (this.finalRoom.roomRent), type: 'Room', date: new Date().toLocaleDateString() }
    ];
    // room charges
    if (cabFormValue.needCab.cost !== 0) {

      services.push({
        cost: cabFormValue.needCab.cost,
        name: 'Cab-' + cabFormValue.needCab.label,
        type: 'cab'
        , date: new Date().toLocaleDateString()

      });
    }

    const bookingDetails = {
      'hotelDetails': {
        'id': this.finalHotel.id,
        'address': this.finalHotel.address,
        'location': this.finalHotel.location,
        'name': this.finalHotel.name,
        'starClass': this.finalHotel.starClass,
        'phone': this.finalHotel.phone,
      },
      'userId': this.currentUser.email,
      'roomDetails':
        {
          'id': this.finalRoom.id,
          'roomType': this.finalRoom.roomType,
          'basicFare': this.finalRoom.basicFare,
          'roomRent': this.finalRoom.roomRent,
          'guestList': guestList,
        },
      'checkingDetails': {
        'isCheckIn': false,
        'isCheckOut': false,
        'checkIn': this.searchDetails.checkIn,
        'checkOut': this.searchDetails.checkOut,
        'approval': false,
      },
      'total': 0,
      'usedServices': services,
      'feedbackRating': '3',
      'feedbackMessage': ''
    };

    // save into db
    const roomKey = this._dbService.bookRoom(bookingDetails, this.finalRoom.isAvailable);




    if (roomKey !== null) {

      const dialogRef = this._dialog.open(QrcodeComponent, {
        width: '35%',
        data: {
          roomKey: roomKey,
          roomKeyMessage: `Room has been Booked \n Following is rook key : ${roomKey}`
        }
      });
      dialogRef.afterClosed().subscribe(result => {

        console.log(result);
        if (result === 'checkin') {
          this._dbService.resetStoreData(false);
          this._router.navigate(['check-in/request']);

        } else {
          this._dbService.resetStoreData(false);
          this._router.navigate(['']);
        }
      });

    }
  }

}
