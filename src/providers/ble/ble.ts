import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class BleProvider {
  public connected: boolean = false;
  public devices: Array<any>;

  constructor(public ble: BLE, private toaster: ToastController, private loader: LoadingController, private alertCtrl: AlertController) {
    this.devices = [];
  }

  scan() {
    this.ble.isEnabled().then(() => {
      this.ble.enable();
    });

    this.devices = [];

    this.ble.startScan([]).subscribe((dev) => {
      console.log(JSON.stringify(dev));
      this.devices.push(dev);
    });

    let loading = this.loader.create({
      content: 'Buscando dispositivos...'
    });

    loading.present();

    setTimeout(() => {
      this.ble.stopScan();
      console.log("Finished Scanning!");
      loading.dismiss();
      console.log(this.devices);

      let alert = this.alertCtrl.create();
      alert.setTitle('Dispositivos Encontrados');

      for (let dev of this.devices) {
        alert.addInput({
          type: 'radio',
          label: dev.name,
          value: dev.id
        });
      }

      alert.addButton('Cancel');
      alert.addButton({
        text: 'Conectar',
        handler: data => {
          this.connect(data);
        }
      })

      alert.present();

    }, 10000);
  }

  connect(dev_id) {
    this.ble.isEnabled().then(() => {
      this.ble.enable();
    });

    this.ble.isConnected(dev_id).then(() => {
      console.log('Already connected');
      this.connected = true;
    }, () => {
      console.log('Disconnected, connecting...');
      this.connected = false;

      this.ble.connect(dev_id).subscribe(() => {
        console.log("Conectado!");
        this.connected = true;
      }, () => {
        console.log("Conection failed");
      })
    });
  }
}
