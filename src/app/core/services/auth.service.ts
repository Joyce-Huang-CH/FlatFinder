import { Injectable } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { collection, addDoc, Firestore, doc, getDoc, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user = this.userSubject.asObservable();

  constructor(private auth: Auth, private router: Router, private firestore: Firestore) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      return userCredential; 
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async register(email: string, password: string, firstName: string, lastName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid;
      const isAdmin = email.endsWith('@company.com');
      // const usersCollection = collection(this.firestore, 'users');
      await setDoc(doc(this.firestore, 'users', userCredential.user.uid),  {
        id: userId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        isAdmin: isAdmin,
        createdAt: serverTimestamp(),
      });
      return userCredential;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(user);
      });
    });
  }


  async getUserProfile(uid: string): Promise<any> {
    const docRef = doc(this.firestore, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }

  
  async updateUserProfile(uid: string, profileData: any) {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      await setDoc(userRef, {
        ...profileData,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
}
