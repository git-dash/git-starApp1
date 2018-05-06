import { Component, OnInit, ViewChild } from '@angular/core';
import { UserFirebaseService } from './shared/shared-services/user-firebase.service';
import { DbFirebaseService } from './shared/shared-services/db-firebase.service';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser2: any;
  rightNavbar: {}[];
  currentUser: any;
  item: {}[];
  title = 'Star Residentz!';
  // @ViewChild('snav') sidenav: MatSidenav;
  navbar: any[] = [
    { 'disabled': false, 'link': '', 'label': 'Search Hotel' }
  ];


  constructor(private _dbService: DbFirebaseService, private _userDbService: UserFirebaseService) {

    this._userDbService.getUserList().subscribe(x => {
      console.log(x);
      this.item = x;
    });

    this._userDbService.getCurrentUser().subscribe(response => {
      if (response != null) {
        const data: any = response.providerData[0];
        // const userId = response.get;

        this._userDbService.getUserProfile(response.uid).subscribe((result: any) => {

          let x: any = result[0];
          if (result[0] === undefined) {
            x = {
              displayName: data.displayName,
              photoURL: data.photoURL,
              providerId: data.providerId,
              email: data.email,
              phoneNumber: '-',
              paymentMode: 'cash',
              roomPreference: [],
              servicePreference: [],
              userId: response.uid,
              isAdmin: false,
              gender: 'male',
            };
          } else {

            x.phoneNumber = x.phoneNumber || null;
            x.displayName = x.displayName || 'Update Profile';
            x.gender = x.gender || null;
            x.paymentMode = x.paymentMode || null;
            x.foodPreference = x.foodPreference || [];
            x.roomPreference = x.roomPreference || [];
            x.servicePreference = x.servicePreference || [];
            x.photoURL =
              data.providerId !== 'password' ? data.photoURL :
                x.photoURL ? x.photoURL : 'assets/logo/man.png';
            x.email = data.email;
            x.userId = response.uid;
            x.providerId = data.providerId;
          }


          if (data.email === 'admin@star.com') {
            x.isAdmin = true;

            this.navbar = [
              // { 'disabled': false, 'link': '', 'label': 'Hotel List' },
              { 'disabled': false, 'link': 'admin/history', 'label': 'My Bookings' },
              { 'disabled': false, 'link': 'admin/chk-req', 'label': 'Guest Requests' },
            ];
          } else {
            x.isAdmin = false;
            this.navbar = [
              { 'disabled': false, 'link': '', 'label': 'Search Hotel' },
              { 'disabled': false, 'link': 'check-in/request', 'label': 'My Bookings' },
              { 'disabled': false, 'link': 'check-in/history', 'label': 'Previous Booking' }
            ];
          }

          this.currentUser = x;
          console.log(this.currentUser);
          this._dbService.setStoreData('currentUser', this.currentUser);
        });
        // if (data.email === 'admin@star.com') {

        //   this.currentUser = {
        //     displayName: data.displayName, // "",
        //     email: data.email,
        //     photoURL: data.photoURL,
        //     phoneNumber: data.phoneNumber,
        //     userId: response.uid,
        //     isAdmin: true
        //   };

        //   this.navbar = [
        //     // { 'disabled': false, 'link': '', 'label': 'Hotel List' },
        //     { 'disabled': false, 'link': 'admin/chk-req', 'label': 'Checkout Requests' },
        //     { 'disabled': false, 'link': 'admin/history', 'label': 'Previous Bookings' },
        //   ];

        // } else {
        //   this.navbar = [
        //     { 'disabled': false, 'link': '', 'label': 'Search Hotel' },
        //     { 'disabled': false, 'link': 'check-in/request', 'label': 'CheckIn Request' },
        //     { 'disabled': false, 'link': 'check-in/history', 'label': 'Previous Booking' }
        //   ];
        //   if (data.displayName === null) {
        //     this.currentUser = {
        //       displayName: 'Update Profile',
        //       email: data.email,
        //       photoURL: data.photoURL,
        //       phoneNumber: data.phoneNumber,
        //       userId: response.getToken(),
        //       isAdmin: false
        //     };
        //   } else {
        //     this.currentUser = data;
        //     this.currentUser.isAdmin = false;
        //     this.currentUser.userId = response.uid;
        //   }

        // }

        // options



      } else {
        this.currentUser = null;
        console.log(this.currentUser);
        this._dbService.setStoreData('currentUser', this.currentUser);
        // options
      }


    });

  }



  logout() {
    this._dbService.resetStoreData(true);
    this._userDbService.logout();
    this.navbar = [
      { 'disabled': false, 'link': '', 'label': 'Search Hotel' }
    ];
    // console.log(this.currentUser);

    // location.reload();
  }
  ngOnInit() {
    // this._userDbService.getCurrentUser().subscribe(response => {
    // });
    // this.navbar = [
    //   { 'disabled': false, 'link': '', 'label': 'Search Hotel' },

    // ];
    // this.rightNavbar = [
    //   { 'class': 'glyphicon glyphicon-user', 'disabled': false, 'link': '', 'label': 'Sign Up' },
    //   { 'class': 'glyphicon glyphicon-log-in', 'disabled': false, 'link': '', 'label': 'LogIn' },
    // ];
    // if (this.currentUser) {
    //   this.navbar = [
    //     { 'disabled': false, 'link': '', 'label': 'Search Hotel' },
    //     { 'disabled': false, 'link': 'check-in', 'label': 'History' },
    //   ];
    //   if (this.currentUser.isAdmin) {
    //     this.navbar = [
    //       { 'disabled': false, 'link': '', 'label': 'hotelList' },
    //       { 'disabled': false, 'link': '', 'label': 'Checkout Request' },
    //       { 'disabled': false, 'link': '', 'label': 'BookingHistory' },
    //     ];
    //   }
    //   this.rightNavbar = [
    //     { 'class': 'glyphicon glyphicon-user', 'disabled': false, 'link': '', 'label': 'Welcome ' + this.currentUser.displayName },
    //     { 'class': 'glyphicon glyphicon-log-out', 'disabled': false, 'link': '', 'label': 'Logout' },
    //   ];
    // }

  }

}
