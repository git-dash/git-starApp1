import { Component, OnChanges, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  // selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent {
  isHistory: boolean;
  hotel: any;

  // @Input() bookingDetail: any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {

    this.hotel = this.data.book;
    this.isHistory = this.data.hist;
  }


}
