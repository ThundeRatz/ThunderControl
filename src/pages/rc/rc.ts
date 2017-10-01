import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';
import { HelpPage } from '../help/help'

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

  constructor(public navCtrl: NavController, public ble_provider: BleProvider, public modalCtrl: ModalController) {
    this.section = {
      'C': 0,
      'F1': 11,
      'F2': 12,
      'F3': 13,
      'FD1': 21,
      'FD2': 22,
      'FD3': 23,
      'D1': 31,
      'D2': 32,
      'D3': 33,
      'TD1': 41,
      'TD2': 42,
      'TD3': 43,
      'T1': 51,
      'T2': 52,
      'T3': 53,
      'TE1': 61,
      'TE2': 62,
      'TE3': 63,
      'E1': 71,
      'E2': 72,
      'E3': 73,
      'FE1': 81,
      'FE2': 82,
      'FE3': 83,
    };

    this.current_section = 'C'
    this.previous_section = 'C'
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
    let max_dist = options.size;

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


      if (data.distance < 0.1*max_dist)
        this.current_section = 'C';
      else if (data.distance < 0.3*max_dist)
        this.current_section += "1";
      else if (data.distance < 0.7*max_dist)
        this.current_section += "2";
      else
        this.current_section += "3";

      if (this.current_section != this.previous_section) {
        console.log("Changed to", this.current_section);
        console.log(this.section[this.current_section]);
        this.ble_provider.sendCommand(this.section[this.current_section]);
      }

      this.previous_section = this.current_section;

    }).on('end', (evt, instance) => {
      this.current_section = 'C';
      this.angle = 0;
      this.dist = 0;
      this.ble_provider.sendCommand(this.section[this.current_section]);
    });
  }

}
