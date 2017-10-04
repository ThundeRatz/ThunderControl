import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';
import { HelpPage } from '../help/help'

@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html'
})
export class FollowPage {
  
  constructor(public navCtrl: NavController, public ble_provider: BleProvider, public modalCtrl: ModalController) {
    
  }
  
  grayToString(v: number): string {
    v = Math.floor(v * 255 / 1023);
    return 'rgb(' + v + ',' + v + ',' + v + ')';
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
