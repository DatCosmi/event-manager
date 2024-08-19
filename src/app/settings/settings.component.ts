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
    // Verificar si el modo oscuro está activado
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
    this.updateDarkMode();
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
    this.updateDarkMode();
  }

  updateDarkMode() {
    document.body.classList.toggle('dark', this.darkMode);
    if (this.darkMode) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
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
