import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-completed-events',
  templateUrl: './completed-events.component.html',
  styleUrls: ['./completed-events.component.scss'],
})
export class CompletedEventsComponent implements OnInit {
  completedEvents$: Observable<any[]>;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {
    this.completedEvents$ = this.eventService.getCompletedEvents();
  }

  ngOnInit() {}

  goToEventDetails(eventId: string) {
    this.router.navigate(['/event', eventId]);
  }
}
