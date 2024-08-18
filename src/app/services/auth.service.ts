import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState;
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      console.error('Error en inicio de sesión', error);
      throw error;
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.setUserData(result.user);
      return result;
    } catch (error) {
      console.error('Error en registro', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  private setUserData(user: any): Promise<void> {
    const userRef = this.afs.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(userData, { merge: true });
  }

  async updateProfile(displayName: string, photoURL: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.updateProfile({ displayName, photoURL });
      await this.setUserData(user);
    }
  }
}
