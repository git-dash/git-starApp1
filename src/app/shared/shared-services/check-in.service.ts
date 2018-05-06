import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class CheckInService {

  constructor(private _dbService: AngularFireDatabase, private _fireAuth: AngularFireAuth) { }


  getAllBookings(dbName) {
    return this._dbService.list(dbName
      // , ref => ref.orderByChild(orderByChild).equalTo(value)
    ).valueChanges();
  }
  checkInRequest(bookingId: string, index: number) {

    const attributeList = ['isCheckIn', 'isCheckOut', 'approval'];
    const id = `bookingDetails/${bookingId}/checkingDetails`;
    // return this._dbService.database.ref().child(id)
    // . app.database().ref().child database().ref() list('bookingDetails').
    const attribute = {

      [attributeList[index]]: true
    };

    // const val2 = { val: true };

    const st = this._dbService.database.ref(id)
      .update(attribute)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    // .subscribe(response => {
    //   console.log(response);

    // });

    return st;
    // .set(, {
    //   'isCheckIn': true
    // });
    // return;
  }
  successfulCheckout(bookingId, roomId, available, total, feedbackMessage, feedbackRating) {
    const bookingDetailsPath = `bookingDetails/${bookingId}`;

    const roomPath = `availableRooms/${roomId}`;

    // this._dbService.database.ref(bookingDetailsPath).valueChanges()
    // .subscribe((data: any) => {

    //   });
    this._dbService.object(bookingDetailsPath).valueChanges().subscribe((data: any) => {
      const post = data;
      // pushed into bookingHistory
      if (post != null) {

        post['total'] = total;
        post['feedbackMessage'] = feedbackMessage;
        post['feedbackRating'] = feedbackRating;


        this._dbService.database.ref('bookingHistory').child(data.roomKey).set(post);
        let roomUpdated = false;
        // this._dbService.object(roomPath + '/isAvailable').valueChanges().subscribe((roomData: any) => {
        this._dbService.object(roomPath).valueChanges().subscribe((roomData: any) => {
          let isAvailable = [];
          if (roomData.isAvailable != null && !roomUpdated) {
            isAvailable = roomData.isAvailable.filter(room => {
              return room !== available ? 1 : 0;

            });

            console.log(isAvailable);
            const noBook = roomData.noBook + 1;
            const totalRating = roomData.totalRating + feedbackRating;
            // set new isAvailable
            this._dbService.database.ref(roomPath).update(
              {
                'isAvailable': isAvailable,
                'noBook': noBook,
                'totalRating': totalRating
              }
            );

            // this._dbService.database.ref(roomPath + '/isAvailable').update();

            this._dbService.database.ref(bookingDetailsPath).remove();
            roomUpdated = true;
          }
        });

      }
    });


  }

}
