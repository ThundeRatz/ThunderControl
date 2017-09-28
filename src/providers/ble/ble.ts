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
        if (dev.name) {
          alert.addInput({
            type: 'radio',
            label: dev.name,
            value: dev
          });
        }
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

  connect(dev) {
    this.ble.isConnected(dev.id).then(() => {
      console.log('Already connected');
      this.connected = true;
    }, () => {
      console.log('Disconnected, connecting...');
      this.connected = false;

      this.ble.connect(dev.id).subscribe((ndev) => {
        console.log("Conectado!");
        console.log(ndev);
        this.toaster.create({
          message: 'Conectado!',
          duration: 1500,
          position: 'bottom'
        }).present();
        this.connected = true;

        this.ble.startNotification(dev.id, "FFE0", "FFE1").subscribe((data) => {
          let received = new Uint8Array(data);
          console.log("Recebido: ");
          console.log(received);
        });

        // Envio de teste
        let data = new Uint8Array(3);
        data[0] = 50;
        data[1] = 51;
        data[2] = 52;
        this.ble.writeWithoutResponse(dev.id, "FFE0", "FFE1", data.buffer).then(() => {
          console.log("Enviado!");
        })

      }, () => {
        console.log("Conection failed");
        this.toaster.create({
          message: 'Desconectado',
          duration: 1500,
          position: 'bottom'
        }).present();
        this.connected = false;
      })
    });
  }
}
