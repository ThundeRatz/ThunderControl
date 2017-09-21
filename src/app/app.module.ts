import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BLE } from '@ionic-native/ble';

import { FollowPage } from '../pages/follow/follow';
import { RCPage } from '../pages/rc/rc';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BleProvider } from '../providers/ble/ble';

@NgModule({
  declarations: [
    MyApp,
    FollowPage,
    RCPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FollowPage,
    RCPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BLE,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BleProvider
  ]
})
export class AppModule {}
