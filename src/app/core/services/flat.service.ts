import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import { Flat } from '../../../models/flat.model';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FlatService {
  constructor(
    private firestore: Firestore,
    private router: Router,
    private auth: Auth
  ) {}

  async createNewFlat(flatFormData: any): Promise<void> {
    try {
      const currentUser = this.auth.currentUser;
      if (!currentUser) {
        throw new Error('User not logged in');
      }

      const flatData: Flat = {
        ...flatFormData,
        ownerId: currentUser.uid,
        dateAvailable: new Date(flatFormData.dateAvailable),
        flatId: '',
      };

      const docRef = await addDoc(
        collection(this.firestore, 'flats'),
        flatData
      );
      await this.updateFlat(docRef.id, { flatId: docRef.id });
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error creating new flat:', error);
      throw error;
    }
  }

  async updateFlat(flatId: string, data: Partial<Flat>): Promise<void> {
    const flatRef = doc(this.firestore, 'flats', flatId);
    return updateDoc(flatRef, data);
  }
}
