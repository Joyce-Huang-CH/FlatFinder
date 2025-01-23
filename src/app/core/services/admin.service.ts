import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { User } from '../../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private firestore: Firestore) { }

  async getAllUsers() {
    const usersRef = collection(this.firestore, 'users');
    return getDocs(usersRef);
  }

  async grantAdmin(userId: string) {
    const userRef = doc(this.firestore, 'users', userId);
    return updateDoc(userRef, { isAdmin: true });
  }

  async deleteUser(userId: string) {
    const userRef = doc(this.firestore, 'users', userId);
    return deleteDoc(userRef);
  }

  async getUsersDataSource(): Promise<MatTableDataSource<User>> {
    const querySnapshot = await this.getAllUsers();
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    return new MatTableDataSource(users);
  }
  
}
