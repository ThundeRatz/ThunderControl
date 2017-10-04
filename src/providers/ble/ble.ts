import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class BleProvider {
  public devices: Array<any>;
  private connected_dev: any;
  public sensors: number[];

  constructor(public ble: BLE, private toaster: ToastController, private loader: LoadingController, private alertCtrl: AlertController) {
    this.devices = [];
    this.sensors = [0, 0, 512, 1000, 4]; // Random test values
  }

  scan() {
    // this.devices = [];

    this.ble.startScan([]).subscribe((dev) => {
      console.log(JSON.stringify(dev));
      if (!this.devices.some(d => d.id === dev.id) && dev.name)
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
          value: dev
        });
      }

      alert.addButton('Cancel');
      if (this.devices.length > 0) {
        alert.addButton({
          text: 'Conectar',
          handler: data => {
            this.connect(data);
          }
        })
      }

      alert.present();

    }, 10000);
  }

  connect(dev) {
    this.ble.isConnected(dev.id).then(() => {
      console.log('Already connected');
    }, () => {
      console.log('Disconnected, connecting...');
      this.connected_dev = undefined;

      this.ble.connect(dev.id).subscribe((ndev) => {
        console.log("Conectado!");
        console.log(ndev);
        this.connected_dev = ndev;
        this.toaster.create({
          message: 'Conectado!',
          duration: 1500,
          position: 'bottom'
        }).present();

        this.ble.startNotification(dev.id, "FFE0", "FFE1").subscribe((data) => {
          let received = new Uint16Array(data)[0];
          console.log("Data: ", data);
          console.log("Recebido: ", received);
          if ((received & 0x8801) == 0) {
              let index = (received >> 12) & 0x0007;
              let value = (received >> 1) & 0x03FF;
              if (index < 5) {
                this.sensors[index] = value;
              } else {
                console.log("Indice incorreto");
              }
          } else {
            console.log ("Mensagem incorreta");
          }
        }, () => {
          console.log("ERR - startNotification");
        });
      }, () => {
        console.log("Conection failed");
        this.toaster.create({
          message: 'Desconectado',
          duration: 1500,
          position: 'bottom'
        }).present();
        this.connected_dev = undefined;
      })
    });
  }

  sendCommand(value: number) {
    if (!this.connected_dev)
      return;

    this.ble.isConnected(this.connected_dev.id).then(() => {
      let data = new Uint8Array(1);
      data[0] = value;

      this.ble.writeWithoutResponse(this.connected_dev.id, "FFE0", "FFE1", data.buffer).then(() => {
        console.log("Enviado!");
      }, () => {
        console.log("ERR - writeWithoutResponse");
      })
    }, () => {
      console.log('Not connected');
    })
  }
}
