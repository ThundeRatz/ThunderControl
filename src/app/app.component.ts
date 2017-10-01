import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Storage } from '@ionic/storage'

import { TabsPage } from '../pages/tabs/tabs';
import { HelpPage } from '../pages/help/help';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, screenOrientation: ScreenOrientation, storage: Storage, modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.hide();
      splashScreen.hide();
      screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);

      storage.get('helpShown').then((res) => {
        if (res) {
          // this.rootPage = TabsPage;
        } else {
          modalCtrl.create(HelpPage).present();
          // this.navCtrl.push(HelpPage)
          storage.set('helpShown', true);
        }
      })

    });
  }
}
