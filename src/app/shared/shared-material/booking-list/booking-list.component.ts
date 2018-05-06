import { Component, OnChanges, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnChanges {

  @Input() srcData: any;
  @Input() columns: any;
  dataSource: any;
  // displayedColumns: any;
  constructor() { }

  ngOnChanges() {

    this.dataSource = new MatTableDataSource(this.srcData);
    // this.displayedColumns = this.srcColumn;
  }

}
