import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private afs: AngularFirestore) {}

  getEvents(): Observable<any[]> {
    return this.afs
      .collection('events', (ref) => ref.where('completed', '==', false))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getCompletedEvents(): Observable<any[]> {
    return this.afs
      .collection('events', (ref) => ref.where('completed', '==', true))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getEvent(id: string): Observable<any> {
    return this.afs.doc(`events/${id}`).valueChanges();
  }

  createEvent(event: any): Promise<any> {
    return this.afs.collection('events').add({ ...event, completed: false });
  }

  updateEvent(id: string, event: any): Promise<void> {
    return this.afs.doc(`events/${id}`).update(event);
  }

  deleteEvent(id: string): Promise<void> {
    return this.afs.doc(`events/${id}`).delete();
  }

  markAsCompleted(id: string): Promise<void> {
    return this.afs.doc(`events/${id}`).update({ completed: true });
  }
}
