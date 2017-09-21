import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';


@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html'
})
export class FollowPage {
  constructor(public navCtrl: NavController, public _ble: BleProvider) {

  }

  bt() {
    this._ble.connect();
  }

  ionViewDidLoad() {
    let circles = document.getElementsByClassName('circle') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < circles.length; i++) {
      circles[i].style.height = window.getComputedStyle(circles[i]).width;
    }
  }
}
