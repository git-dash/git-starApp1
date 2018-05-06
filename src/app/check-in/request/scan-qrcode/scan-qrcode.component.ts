import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-scan-qrcode',
  templateUrl: './scan-qrcode.component.html',
  styleUrls: ['./scan-qrcode.component.css']
})
export class ScanQrcodeComponent {
  // dataurl: any;
  inputMode = 'textMode';
  // delete afterwards
  elementType = 'url';
  dataurl = null;
  scanKey: string = null;
  key: string = null;
  constructor(public dialogRef: MatDialogRef<ScanQrcodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.key = data.roomKey;
  }



  render(e) {
    this.key = e.result;
    console.log(e.result);

  }



  onChange(event) {
    this.elementType = 'dataurl';
    const files = event.srcElement.files;
    console.log(files);
    const fi = new FileReader();

    fi.onload =
      (e) => {
        this.dataurl = fi.result;
      };

    // fi.onload(x => console.log(x));

    fi.readAsDataURL(files[0]);
  }
}
