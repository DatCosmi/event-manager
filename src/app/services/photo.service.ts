import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: any[] = [];

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  public async addPhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });

    this.photos.push(photo.dataUrl);
    return photo.dataUrl;
  }

  public uploadPhoto(photoDataUrl: string): Observable<string> {
    const fileName = new Date().getTime() + 'unidad_3.jpg';
    const filePath = `photos/${fileName}`;
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.putString(photoDataUrl, 'data_url');

    return from(task).pipe(
      switchMap(() => fileRef.getDownloadURL()),
      switchMap((downloadURL) => {
        // Save to Firestore
        return this.saveToFirestore(downloadURL, photoDataUrl);
      })
    );
  }

  private saveToFirestore(
    downloadURL: string,
    base64: string
  ): Observable<string> {
    const docRef = this.firestore.collection('images').doc();
    return from(docRef.set({ downloadURL, base64 })).pipe(
      map(() => downloadURL)
    );
  }

  public getStoredPhotos(): Observable<string[]> {
    return this.firestore
      .collection('images')
      .valueChanges()
      .pipe(
        map((images: any[]) =>
          images
            .filter((img) => img.downloadURL && img.downloadURL.length > 0)
            .map((img) => img.downloadURL)
        )
      );
  }
}
