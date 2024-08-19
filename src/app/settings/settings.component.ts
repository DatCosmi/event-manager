import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  primaryColor: string = '#3880ff';
  secondaryColor: string = '#3dc2ff';
  darkMode: boolean = false;

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.darkMode = document.body.classList.contains('dark');
  }

  updateColors() {
    document.documentElement.style.setProperty(
      '--ion-color-primary',
      this.primaryColor
    );
    document.documentElement.style.setProperty(
      '--ion-color-secondary',
      this.secondaryColor
    );
    this.showAlert('Éxito', 'Los colores han sido actualizados');
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
