import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  displayName: string = '';
  photoURL: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.displayName = user.displayName || '';
        this.photoURL = user.photoURL || '';
      }
    });
  }

  async updateProfile() {
    await this.authService.updateProfile(this.displayName, this.photoURL);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });

    this.photoURL = image.dataUrl || '';
  }
}
