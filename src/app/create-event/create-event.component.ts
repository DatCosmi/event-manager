import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent {
  event = {
    title: '',
    description: '',
    date: '',
    location: '',
  };

  constructor(private eventService: EventService, private router: Router) {}

  async createEvent() {
    await this.eventService.createEvent(this.event);
    this.router.navigate(['/events']);
  }
}
