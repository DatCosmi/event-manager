import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      await this.showAlert('Éxito', 'Inicio de sesión exitoso');
      this.router.navigate(['/events']);
    } catch (error) {
      await this.showAlert(
        'Error',
        'No se pudo iniciar sesión. Verifique sus credenciales.'
      );
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
