import { Component, OnInit } from '@angular/core';
import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  currentUser: any;
  bookingDetails: any = [];
  bookingHistory: any = [];
  book: any;
  constructor(private _dbService: DbFirebaseService) { }

  ngOnInit() {

    this.currentUser = this._dbService.getStoreData('currentUser');


    this._dbService.getDbData('bookingHistory', 'userId', this.currentUser.email).subscribe(response => {
      console.log(response);
      this.bookingHistory = response;
    }, error => {
      console.log(error);

    });
  }


}
