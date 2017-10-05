import { Injectable, ApplicationRef } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class BleProvider {
  public devices: Array<any>;
  private connected_dev: any;
  public sensors: number[];

  constructor(public ble: BLE, private toaster: ToastController, private loader: LoadingController, private alertCtrl: AlertController, private appRef: ApplicationRef) {
    this.devices = [];
    this.sensors = [0, 0, 0, 0, 0]; // Random test values
  }

  scan() {
    this.ble.startScan([]).subscribe((dev) => {
      console.log(JSON.stringify(dev));
      if (!this.devices.some(d => d.id === dev.id) && dev.name)
        this.devices.push(dev);
    });

    let loading = this.loader.create({
      content: 'Buscando dispositivos...'
    });

    loading.present().then(() => {
      setTimeout(() => {
        this.ble.stopScan().then(() => {});

        loading.dismiss().then(() => {
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
              handler: (data) => {
                this.connect(data);
              }
            })
          }

          alert.present();
        });
      }, 10000);
    });
  }

  connect(dev) {
    this.ble.isConnected(dev.id).catch(() => {
      console.log('Disconnected, connecting...');
      this.connected_dev = undefined;

      this.ble.connect(dev.id).subscribe((ndev) => {
        this.connected_dev = ndev;
        this.toaster.create({
          message: 'Conectado!',
          duration: 1500,
          position: 'bottom'
        }).present();

        this.ble.startNotification(dev.id, "FFE0", "FFE1").subscribe((data) => {
          let received = new Uint16Array(data)[0];
          this.unpack(received);
          this.appRef.tick();
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

  sendCommand(value: number): void {
    if (!this.connected_dev)
      return;

    this.ble.isConnected(this.connected_dev.id).then(() => {
      let data = new Uint8Array(1);
      data[0] = value;

      this.ble.writeWithoutResponse(this.connected_dev.id, "FFE0", "FFE1", data.buffer).catch(() => {
        console.log("ERR - writeWithoutResponse");
      })
    }).catch(() => {
      console.log('Not connected');
    })
  }

  unpack(v: number): void {
    if ((v & 0x8801) == 0) {
      let index = (v >> 12) & 0x0007;
      let value = (v >> 1) & 0x03FF;
      if (index < 5)
        this.sensors[index] = value;
    } else {
      console.log ("Mensagem incorreta");
    }
  }
}
