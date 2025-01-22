import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { collection, addDoc, Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router, private firestore: Firestore) { }

  login(email: string, password: string){
    console.log(Auth);
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

  getCurrentUser() {
    return this.auth.currentUser;
  }

  isAdmin() {
    // return this.auth.isAdmin;
  }
}
