import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  startApp() {
    this.viewCtrl.dismiss();
  }

  openFacebook() {
    window.open("https://www.facebook.com/thunderatz", "_blank");
  }

  openInstagram() {
    window.open("https://www.instagram.com/thunderatz", "_blank");
  }

  openYoutube() {
    window.open("https://www.youtube.com/thunderatz", "_blank");
  }

  openWebsite() {
    window.open("http://thunderatz.org", "_blank");
  }

}
