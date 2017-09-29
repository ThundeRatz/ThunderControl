import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';


@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html'
})
export class FollowPage {
  sensors: Array<{ value: number, color: string }>;

  constructor(public navCtrl: NavController, public ble_provider: BleProvider) {
    this.sensors = [
      { value: 0, color: '#FFF' },
      { value: 1, color: '#CCC' },
      { value: 2, color: '#555' },
      { value: 3, color: '#333' },
      { value: 4, color: '#000' }
    ];
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
