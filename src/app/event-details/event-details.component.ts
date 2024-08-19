import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event: any = {};
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEvent(eventId).subscribe(event => {
        this.event = { id: eventId, ...event };
      });
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  async updateEvent() {
    try {
      await this.eventService.updateEvent(this.event.id, this.event);
      this.editMode = false;
      this.showAlert('Éxito', 'Evento actualizado correctamente');
      this.router.navigate(['/events']);
    } catch (error) {
      this.showAlert('Error', 'No se pudo actualizar el evento');
    }
  }

  async deleteEvent() {
    try {
      await this.eventService.deleteEvent(this.event.id);
      this.showAlert('Éxito', 'Evento eliminado correctamente');
      this.router.navigate(['/events']);
    } catch (error) {
      this.showAlert('Error', 'No se pudo eliminar el evento');
    }
  }

  async markAsCompleted() {
    try {
      await this.eventService.markAsCompleted(this.event.id);
      this.showAlert('Éxito', 'Evento marcado como completado');
      this.router.navigate(['/events']);
    } catch (error) {
      this.showAlert('Error', 'No se pudo marcar el evento como completado');
    }
  }

  goBack() {
    this.router.navigate(['/events']);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}