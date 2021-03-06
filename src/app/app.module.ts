import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BLE } from '@ionic-native/ble';
import { IonicStorageModule } from '@ionic/storage'

import { FollowPage } from '../pages/follow/follow';
import { RCPage } from '../pages/rc/rc';
import { TabsPage } from '../pages/tabs/tabs';
import { HelpPage } from '../pages/help/help';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { BleProvider } from '../providers/ble/ble';

@NgModule({
  declarations: [
    MyApp,
    FollowPage,
    RCPage,
    TabsPage,
    HelpPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FollowPage,
    RCPage,
    TabsPage,
    HelpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    BLE,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BleProvider
  ]
})
export class AppModule {}
