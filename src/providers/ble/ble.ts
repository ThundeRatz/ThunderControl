import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { ToastController } from 'ionic-angular';

@Injectable()
export class BleProvider {
  public connected: boolean = false;

  constructor(public ble: BLE, private toaster: ToastController) {

  }

  connect() {
    // Teste do provider
    // Colocar as coisas do BLE e um alert ou modal
    // E um loading
    if (this.connected) {
      this.toaster.create({
        message: 'Desconectando...',
        duration: 1000,
        position: 'bottom'
      }).present();
      this.connected = false;
    } else {
      this.toaster.create({
        message: 'Conectando...',
        duration: 1000,
        position: 'bottom'
      }).present();
      this.connected = true;
    }
  }
}
