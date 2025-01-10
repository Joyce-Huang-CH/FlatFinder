import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, updateDoc, doc } from '@angular/fire/firestore';
import { Flat } from '../../../models/flat.model'

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  constructor( private firestore: Firestore) { }

  addFlat(flat: Flat){
    return addDoc(collection(this.firestore, 'flats'), flat);
  }

  getAllFlats(){
    return getDocs(collection(this.firestore, 'flats'));
  }

  updateFlat(id: string, flat: Partial<Flat>) {
    return updateDoc(doc(this.firestore, `flats/${id}`), flat);
  }
}
