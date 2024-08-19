import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-completed-events',
  templateUrl: './completed-events.component.html',
  styleUrls: ['./completed-events.component.scss'],
})
export class CompletedEventsComponent implements OnInit {
  completedEvents$: Observable<any[]>;

  constructor(private eventService: EventService) {
    this.completedEvents$ = this.eventService.getCompletedEvents();
  }

  ngOnInit() {}
}
