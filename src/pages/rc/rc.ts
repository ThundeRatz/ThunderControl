import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';

import nipplejs from 'nipplejs';

@Component({
  selector: 'page-rc',
  templateUrl: 'rc.html'
})
export class RCPage {
  pos_x: number;
  pos_y: number;

  constructor(public navCtrl: NavController, public _ble: BleProvider) {

  }

  bt() {
    this._ble.scan();
  }

  ionViewDidLoad() {
    let options = {
      zone: document.getElementById('zone-joystick'),
      position: {
        top: '50%',
        left: '50%'
      },
      mode: 'static',
      color: 'blue',
      size: document.getElementById('zone-joystick').offsetWidth * 0.8
    };

    let manager = nipplejs.create(options);

    manager.on('move', (evt, data) => {
      this.pos_x = Math.floor(data.position.x - data.instance.position.x);
      this.pos_y = Math.floor(data.instance.position.y - data.position.y);
    }).on('end', (evt, instance) => {
      this.pos_x = 0;
      this.pos_y = 0;
    });
  }

}
