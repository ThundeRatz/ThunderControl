import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import nipplejs from 'nipplejs';

@Component({
  selector: 'page-rc',
  templateUrl: 'rc.html'
})
export class RCPage {

  constructor(public navCtrl: NavController) {

  }

  bt() {

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
  }

}
