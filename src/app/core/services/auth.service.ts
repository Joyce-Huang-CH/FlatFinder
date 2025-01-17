import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) { }

  login(auth: Auth, email: string, password: string){
    signInWithEmailAndPassword(auth, email, password)
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

  register(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
}
