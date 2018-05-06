import { Component, OnChanges, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnChanges {
  slides: { 'imgSrc': string; }[];
  @Input() slideDetails: any;
  ngOnChanges(): void {

    console.log(this.slideDetails);


  }

  constructor() {
    this.slides = [
      { 'imgSrc': environment.confRoomDefaultLocation + 'hotel-1.jpg', },
      { 'imgSrc': environment.confRoomDefaultLocation + 'hotel-2.jpg', },
      { 'imgSrc': environment.confRoomDefaultLocation + 'hotel-3.jpg', },
      { 'imgSrc': environment.confRoomDefaultLocation + 'hotel-4.jpg', },
      { 'imgSrc': environment.confRoomDefaultLocation + 'hotel-6.jpg' },
    ];


    this.slides = [

      { 'imgSrc': 'assets/images/rooms/r1.jpg', },
      { 'imgSrc': 'assets/images/rooms/r2.jpg', },
      { 'imgSrc': 'assets/images/rooms/r3.jpg', },
      { 'imgSrc': 'assets/images/rooms/r4.jpg', },
      { 'imgSrc': 'assets/images/rooms/r5.jpg' },
    ];
  }


}
