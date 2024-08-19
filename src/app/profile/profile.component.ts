import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController, NavController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  displayName: string = '';
  photoURL: string = '';
  newPhotoTaken: boolean = false;

  constructor(
    private photoService: PhotoService,
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
      if (this.newPhotoTaken) {
        // Si se tomó una nueva foto, súbela primero
        const photoDataUrl = this.photoURL;
        const downloadURL = await this.photoService
          .uploadPhoto(photoDataUrl)
          .toPromise();
        if (downloadURL) {
          this.photoURL = downloadURL;
        } else {
          throw new Error('No se pudo obtener la URL de descarga');
        }
      }

      // Actualizar el perfil con el nuevo nombre y/o foto
      await this.authService.updateProfile(this.displayName, this.photoURL);
      await this.showAlert('Éxito', 'Perfil actualizado correctamente');
      this.navController.navigateRoot('/events');
    } catch (error) {
      console.error('Error updating profile:', error);
      await this.showAlert('Error', 'No se pudo actualizar el perfil');
    }
  }

  async takePicture() {
    try {
      const photoDataUrl = await this.photoService.addPhoto();
      if (photoDataUrl) {
        this.photoURL = photoDataUrl;
        this.newPhotoTaken = true;
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      await this.showAlert('Error', 'No se pudo tomar la foto');
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

  goBack() {
    this.navController.back();
  }
}
