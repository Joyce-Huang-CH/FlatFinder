import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }

  // 獲取所有用戶
  getAllUsers() {
    const userCollection = collection(this.firestore, 'users');
    return getDocs(userCollection);
  }

  // 授權管理員權限
  grantAdmin(userId: string) {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return updateDoc(userDoc, { isAdmin: true });
  }

  // 刪除用戶
  deleteUser(userId: string) {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return deleteDoc(userDoc);
  }
}
