import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LocalStorageService } from 'ngx-webstorage';
import querybase from 'querybase';
import { promise } from 'selenium-webdriver';
@Injectable()
export class DbFirebaseService {

  currentUser: any;
  selectedHotel;
  finalHotel: any;
  finalRoom: any;

  constructor(private _dbService: AngularFireDatabase, private _sessionStore: LocalStorageService) { }

  getHotelList(searchDetail: any) {

    // this._dbService.list('bookingDetails').valueChanges().subscribe(data => {
    //   console.log(data);
    // });
    return this._dbService.list('hotel', ref => ref.orderByChild('location').equalTo(searchDetail.location)).valueChanges();
    // return this.getAllHotelList('all');
  }
  getAllHotelList(hotelId) {
    return hotelId === 'all' ? this._dbService.list('hotel').valueChanges() :
      this._dbService.list(`'hotel\'${hotelId}`).valueChanges();
  }
  getRoomList(hotelId: any) {



    this._dbService.list('availableRooms', ref => ref.orderByChild('hotelId').equalTo('0'))
      .valueChanges()
      .subscribe(x => {
        console.log('all rooms  for 0: ' + x);
      });

    return this._dbService.list('availableRooms', ref => ref.orderByChild('hotelId').equalTo(hotelId))
      .valueChanges();
    //  this._dbService.list('availableRooms');
    // this.    _dbService.list('/availableRooms', ref => ref.orderByChild('hotelId').equalTo(hotelId)).valueChanges();

  }

  setStoreData(varName: any, value: any) {
    // this[varName] = value;
    // sessionStorage.setItem(varName, JSON.stringify(value));
    this._sessionStore.store(varName, value);
  }
  getStoreData(requestItem) {
    // return JSON.parse(sessionStorage.getItem(requestItem));
    return this._sessionStore.retrieve(requestItem);
    // this[requestItem];
  }
  resetStoreData(isLogout) {
    // sessionStorage.clear();
    const usr = this._sessionStore.retrieve('currentUser');
    this._sessionStore.clear();
    if (!isLogout) {
      this._sessionStore.store('currentUser', usr);
    }

  }



  bookRoom(post, isAvailable) {

    const roomKey = this._dbService.createPushId();
    post.roomKey = roomKey;
    const str = post.checkingDetails.checkIn + '-' + post.checkingDetails.checkOut;
    if (isAvailable.indexOf(str) === -1) {
      isAvailable.push(str);
    }
    // updating room table
    // this._dbService.list('availableRooms', ref => ref.orderByChild('id').equalTo(post.roomId))
    //   .update('0', { 'isAvailable': isAvailable });

    this._dbService.database.ref(`availableRooms/${post.roomDetails.id}/isAvailable`).set(isAvailable);

    // this._dbService.list(
    //   'availableRooms'
    //   // `availableRooms/${post.roomId}/isAvailable`,
    // ).update(post.roomDetails.id, { 'isAvailable': isAvailable });


    // 8.valueChanges().subscribe(data => { });

    this._dbService.database.ref('bookingDetails').child(roomKey).set(post);
    return roomKey;
  }

  getCityList() {
    return this._dbService.object('hotel').valueChanges();
    // .map(response => response.);
  }
  // getUserRoomHistory(userId) {
  //   return this._dbService.list('bookingDetails'
  //     , ref => ref.orderByChild('userId').equalTo('1')
  //   ).valueChanges();
  // }

  // method like adapter
  // getDbData(dbName, orderByChild, value: string) {
  //   return this._dbService.list(dbName),
  //     ref => ref.orderByChild(orderByChild).equalTo(value)
  //       .valueChanges();
  // }

  getDbData(dbName, orderByChild, value: string) {
    return this._dbService.list(dbName
      , ref => ref.orderByChild(orderByChild).equalTo(value)
    ).valueChanges()
      // .subscribe(data => {
      //   const bookingdetails = data;
      //   let hotelIds = [], roomIds = [];
      //   bookingdetails.forEach((element: any) => {
      //     if (hotelIds.findIndex(element.hotelId) === -1) {
      //       hotelIds.push(element.hotelId);
      //     }
      //     if (roomIds.findIndex(element.roomId) === -1) {
      //       roomIds.push(element.roomId);
      //     }
      //   });
      //   this._dbService.list('hotel').valueChanges().subscribe(response => {
      //   });
      // });
      ;
  }
}
