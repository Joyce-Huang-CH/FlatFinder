import { Injectable } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { collection, addDoc, Firestore, doc, getDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router, private firestore: Firestore) { }

  login(email: string, password: string){
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      this.router.navigate(['/home'])
    })
    .catch((error) => {
      console.log(error.massage)
      throw error;
    })
    // return signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string, firstName: string, lastName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid;
      const isAdmin = email.endsWith('@company.com');
      const usersCollection = collection(this.firestore, 'users');
      await addDoc(usersCollection, {
        id: userId,
        email,
        firstName,
        lastName,
        isAdmin
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  logout() {
    return this.auth.signOut();
  }

  // async getCurrentUser(): Promise<User | null> {
  //   return new Promise((resolve) => {
  //     onAuthStateChanged(this.auth, (user) => {
  //       resolve(user);
  //     });
  //   });
  // }

  getCurrentUser() {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user)
  }

  async getUserProfile(uid: string): Promise<any> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    console.log(userDocRef)
    const userDocSnap = await getDoc(userDocRef);
    console.log(userDocSnap)
    return userDocSnap.exists() ? userDocSnap.data() : null;
  }

  isAdmin() {
    // return this.auth.isAdmin;
  }
}
