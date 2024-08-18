import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  events$: Observable<any[]>;

  constructor(private eventService: EventService) {
    this.events$ = this.eventService.getEvents();
  }

  ngOnInit() {}
}
