import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  displayName: string = '';
  photoURL: string = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.displayName = user.displayName || '';
        this.photoURL = user.photoURL || '';
      }
    });
  }

  async updateProfile() {
    try {
      await this.authService.updateProfile(this.displayName, this.photoURL);
      this.showAlert('Éxito', 'Perfil actualizado correctamente');
      this.navController.navigateRoot('/events');
    } catch (error) {
      this.showAlert('Error', 'No se pudo actualizar el perfil');
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });

    this.photoURL = image.dataUrl || '';
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goBack() {
    this.navController.back();
  }
}
