import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  events$: Observable<any[]>;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {
    this.events$ = this.eventService.getEvents();
  }

  ngOnInit() {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToEventDetails(eventId: string) {
    this.router.navigate(['/event', eventId]);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  goToCompletedEvents() {
    this.router.navigate(['/completed-events']);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
