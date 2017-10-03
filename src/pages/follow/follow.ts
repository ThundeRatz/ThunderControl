import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';
import { HelpPage } from '../help/help'

class GrayColor {
  private v: number;

  constructor(n: number) {
    this.v = n;
  }

  setV(n: number) {
    this.v = n;
  }

  toString(): string {
    return 'rgb(' + this.v + ',' + this.v + ',' + this.v + ')';
  }
}

@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html'
})
export class FollowPage {
  sensors: Array<{ value: number, color: GrayColor }>;

  constructor(public navCtrl: NavController, public ble_provider: BleProvider, public modalCtrl: ModalController) {
    this.sensors = [
      { value: 0, color: new GrayColor(255) },
      { value: 1, color: new GrayColor(200) },
      { value: 2, color: new GrayColor(170) },
      { value: 3, color: new GrayColor(60) },
      { value: 4, color: new GrayColor(0) }
    ];
  }

  help() {
    const help_modal = this.modalCtrl.create(HelpPage);
    help_modal.present();
  }

  bt() {
    this.ble_provider.ble.isEnabled().then(() => {
      this.ble_provider.scan();
    }, () => {
      this.ble_provider.ble.enable();
    });
  }

  play() {
    this.ble_provider.sendCommand(200);
  }

  pause() {
    this.ble_provider.sendCommand(201);
  }

  ionViewDidLoad() {
    let circles = document.getElementsByClassName('circle') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < circles.length; i++) {
      circles[i].style.height = window.getComputedStyle(circles[i]).width;
    }
  }
}
