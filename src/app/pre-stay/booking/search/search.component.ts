import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbFirebaseService } from '../../../shared/shared-services/db-firebase.service';

import { environment } from '../../../../environments/environment';
import { UserFirebaseService } from '../../../shared/shared-services/user-firebase.service';
import { FilterValues } from '../../../entity/filter';
// import { querybase } from 'querybase';
@Component({
  // selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  userProfile: any = {
    'searchByPreference': false
  };
  currentUser: any;
  roomFiltered: any;
  finalHotel: any;
  hotelRooms: {}[];
  searchForm: FormGroup;
  startDate = new Date();
  items: any = [];
  hotels: any;
  enableAdvanceFilter = false;
  preferenceToggle = false;
  hotelSearched = false;
  footer = [
    {
      images: [

        'a2.jpg',
        'a1.jpg'
      ],
      description: [
        'Choose Best Hotel as per your preference !',
        'Get Rewards points on hotel booking',
      ]
    },
    {
      images: [
        'f1.jpg',
        'f2.jpg',
        'f3.jpg',
        'f4.jpg',
        'f5.jpg',
      ],
      description: [
        'Food Available from all areas !',
        'And Many More....'
      ]
    },
    {
      images: [
        'e1.jpg',
        'e2.jpg',
        'e3.jpg',
        'e4.jpg',
        'e5.jpg',
        'e6.jpg',
        'e7.jpg',
      ],
      description:
        [
          'Get Ready for more ...',
          ''
        ]
    }
  ];
  commonService = environment.filterData.commonService;

  roomTypes = environment.filterData.roomTypes;

  guestRating = environment.filterData.guestRating;



  starRating = environment.filterData.starRating;

  states = [
    // 'Pune'
  ];


  roomImageList = {
    currentImage: environment.roomDefaultLocation + '1.jpg',
    imageList: [
      environment.roomDefaultLocation + '1.jpg',
      environment.roomDefaultLocation + '2.jpg',
      environment.roomDefaultLocation + '3.jpg',
      environment.roomDefaultLocation + '4.jpg',
      environment.roomDefaultLocation + '5.jpg',
      environment.roomDefaultLocation + '6.jpg'
    ]
  };
  filterValues: any = {
    price: 500,
    starRating: [],
    guestRating: [],
    commonService: [],
    roomTypes: []
  };
  hotelFiltered = false;

  getRoomDesc(roomType: any) {
    return this.roomTypes.find(x => x.label === roomType).desc;


  }
  resetallFilters() {
    this.filterValues = {
      price: 500,
      starRating: [],
      guestRating: [],
      commonService: [],
      roomTypes: []
    };

    // reset all filter options
    const options = ['starRating', 'commonService', 'roomTypes', 'guestRating'];
    options.forEach(element => {
      this[element].forEach(el => {
        el.selected = false;
      });
    });
  }
  changeFilter(filteredBy, value, isSelected, fromHotel): any {

    if (filteredBy === 'price') {
      this.filterValues[filteredBy] = value;
      // console.log(filteredBy, value, isSelected);
    } else {
      // push into array
      if (isSelected) {
        this.filterValues[filteredBy].push(value);
      } else {
        const index = this.filterValues[filteredBy].findIndex(x => x === value);
        if (index !== -1) {
          this.filterValues[filteredBy].splice(index, 1);
        }
      }

      console.log(this.filterValues);
      fromHotel ? this.hotelFiltered = !this.hotelFiltered
        : this.roomFiltered = !this.roomFiltered;

      //  this.orderBy = !this.orderBy;
    }
  }


  constructor(private _formBuilder: FormBuilder, private _dbService: DbFirebaseService,
    private _userDbService: UserFirebaseService, private _router: Router) {



    this.searchForm = this._formBuilder.group({
      'location': [null, Validators.required],
      'checkIn': [null, Validators.required],
      'checkOut': [null, Validators.required],
      'maxPeople': [null, Validators.required]
    });

    // this.searchForm.patchValue({

    //   location: this.states[0],
    //   checkIn: this.startDate,
    //   checkOut: this.startDate,
    //   maxPeople: 1,
    // });
    this.currentUser = this._dbService.getStoreData('currentUser');

    if (this.currentUser != null) {
      const x = this.currentUser;
      x.servicePreference = x.servicePreference !== undefined ?
        x.servicePreference.map(servPref => this.commonService.find(serv => serv.label === servPref).value) : [];

      this.userProfile = x;

    }

  }


  ngOnInit() {

    this._dbService.getCityList()

      .subscribe((response: any) => {

        response.forEach((hotel: any) => {
          if (this.states.findIndex(x => x === hotel.location) === -1) {
            this.states.push(hotel.location);
          }
        });


      });
  }

  search(searchLocation: any): void {


    this.hotelSearched = true;
    console.log(searchLocation);



    this._dbService.getHotelList(searchLocation)

      .subscribe(data => {


        data.forEach((x: any) => { x.availableRooms = []; x.searchRoomClicked = false; });
        this.hotels = data;

      });

  }
  getRoomList(index2: number, hotelId: string) {

    this.enableAdvanceFilter = true;
    const searchDetails = {
      'location': this.searchForm.value.location,
      'checkIn': this.searchForm.value.checkIn.toLocaleDateString(),
      'checkOut': this.searchForm.value.checkOut.toLocaleDateString(),
      'maxPeople': this.searchForm.value.maxPeople
    };


    this._dbService.setStoreData('selectedHotel', hotelId);
    this._dbService.getRoomList(hotelId).subscribe((roomList: any) => {

      const rent: any =
        Math.round((new Date(searchDetails.checkOut).getTime() - new Date(searchDetails.checkIn).getTime())
          / (1000 * 60 * 60 * 24)) + 1;
      // parse only available rooms

      const searchInput = [searchDetails.checkIn, searchDetails.checkOut];

      roomList.forEach((x: any) => {
        if (!x.isAvailable) {
          x.isAvailable = []; // set default array
        }
        x.roomRent = (x.basicFare * rent);
      });
      const temp =
        roomList.filter(room => {
          let checkAvail = true;
          if (room.isAvailable.length !== 0) {
            checkAvail = room.isAvailable.some(avail => {
              const fd = avail.split('-');
              console.log(new Date(fd[0]) <= new Date(searchInput[0]) && new Date(fd[1]) >= new Date(searchInput[1]));

              return new Date(fd[0]) <= new Date(searchInput[0]) && new Date(fd[1]) >= new Date(searchInput[1]); // ? 0 : 1;
            });
            checkAvail = !checkAvail;
          } else {
            checkAvail = true;
          }
          console.log(checkAvail);
          // checkAvail ? room.maxPeople > searchDetails.maxPeople
          return checkAvail ?
            searchDetails.maxPeople <= room.maxPeople : false;

          // return checkAvail;
        });

      const index = this.hotels.findIndex(hotel => hotel.id === hotelId);
      this.hotels[index]['availableRooms'] = temp;
      this.hotels[index]['searchRoomClicked'] = true;
      console.log('rooms' + temp);
      this.preferenceToggle = !this.preferenceToggle;
    });

  }


  bookRoom(finalRoom, finalHotel) {
    console.log(finalRoom + finalHotel);

    const searchDetails = {
      'location': this.searchForm.value.location,
      'checkIn': this.searchForm.value.checkIn.toLocaleDateString(),
      'checkOut': this.searchForm.value.checkOut.toLocaleDateString(),
      'maxPeople': this.searchForm.value.maxPeople
    };





    this._dbService.setStoreData('finalRoom', finalRoom);
    this._dbService.setStoreData('finalHotel', finalHotel);
    this._dbService.setStoreData('searchDetails', searchDetails);
    this._router.navigate(['hotel/booking/confirm-book']);




  }

}

