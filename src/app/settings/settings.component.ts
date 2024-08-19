import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  primaryColor: string = '#3880ff';
  secondaryColor: string = '#3dc2ff';

  constructor() {}

  updateColors() {
    document.documentElement.style.setProperty(
      '--ion-color-primary',
      this.primaryColor
    );
    document.documentElement.style.setProperty(
      '--ion-color-secondary',
      this.secondaryColor
    );
  }
}
