import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';


@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html'
})
export class FollowPage {
  constructor(public navCtrl: NavController, public ble_provider: BleProvider) {

  }

  bt() {
    this.ble_provider.ble.isEnabled().then(() => {
      this.ble_provider.scan();
    }, () => {
      this.ble_provider.ble.enable();
    });
  }

  ionViewDidLoad() {
    let circles = document.getElementsByClassName('circle') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < circles.length; i++) {
      circles[i].style.height = window.getComputedStyle(circles[i]).width;
    }
  }
}
