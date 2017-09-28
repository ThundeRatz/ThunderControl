import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';

import nipplejs from 'nipplejs';

@Component({
  selector: 'page-rc',
  templateUrl: 'rc.html'
})
export class RCPage {
  angle: number;
  dist: number;

  section: any;
  current_section: string;
  previous_section: string;

  constructor(public navCtrl: NavController, public ble_provider: BleProvider) {
    this.section = {
      'C': 0,
      'F1': 1,
      'F2': 2,
      'F3': 3,
      'FD1': 4,
      'FD2': 5,
      'FD3': 6,
      'D1': 7,
      'D2': 8,
      'D3': 9,
      'TD1': 10,
      'TD2': 11,
      'TD3': 12,
      'T1': 13,
      'T2': 14,
      'T3': 15,
      'TE1': 16,
      'TE2': 17,
      'TE3': 18,
      'E1': 19,
      'E2': 20,
      'E3': 21,
      'FE1': 22,
      'FE2': 23,
      'FE3': 24,
    };

    this.current_section = 'C'
    this.previous_section = 'C'
  }

  bt() {
    this.ble_provider.ble.isEnabled().then(() => {
      this.ble_provider.scan();
    }, () => {
      this.ble_provider.ble.enable();
    });
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
      this.angle = Math.floor(data.angle.degree);
      this.dist = Math.floor(data.distance);

      if (data.angle.degree < 22.5)
        this.current_section = "D";
      else if (data.angle.degree < 67.5)
        this.current_section = "FD";
      else if (data.angle.degree < 112.5)
        this.current_section = "F";
      else if (data.angle.degree < 157.5)
        this.current_section = "FE";
      else if (data.angle.degree < 202.5)
        this.current_section = "E";
      else if (data.angle.degree < 247.5)
        this.current_section = "TE";
      else if (data.angle.degree < 292.5)
        this.current_section = "T";
      else if (data.angle.degree < 337.5)
        this.current_section = "TD";
      else if (data.angle.degree < 360)
        this.current_section = "D";

      if (data.distance < 13)
        this.current_section = 'C';
      else if (data.distance < 39)
        this.current_section += "1";
      else if (data.distance < 78)
        this.current_section += "2";
      else
        this.current_section += "3";

      if (this.current_section != this.previous_section) {
        console.log("Changed to ", this.current_section);
        console.log(this.section['C']);
      }

      this.previous_section = this.current_section;

    }).on('end', (evt, instance) => {
      this.current_section = 'C';
      this.angle = 0;
      this.dist = 0;
    });
  }

}
