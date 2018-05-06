import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  roomKeyMessage: string;
  roomKey: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.roomKey = data.roomKey;
    this.roomKeyMessage = `Room has been Booked \n Following is rook key : ${data.roomKey}`;
  }

  clicked(event) {

    const src = event.path[0].src;
    console.log('imageLogged' + src);

    const link = document.createElement('a');
    link.href =
      event.path[0].src;
    link.download = 'qrCode.png';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  ngOnInit() {
  }

}
