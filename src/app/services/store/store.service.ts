import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StoreService<T> {

  constructor(private firestore: AngularFirestore) { }

  async getCollection(collection: string): Promise<T[]> {
    const ref = await this.firestore.collection<T>(collection).get().toPromise();
    return ref.docs.map<T>(doc => doc.data() as T);
  }

  async getDocument(collection: string, document: string): Promise<T> {
    const ref = await this.firestore.collection(collection).doc(document).get().toPromise();
    return ref.data() as T;
  }

  async addDocument(collection: string, document: string, data: T): Promise<void> {
    return await this.firestore.collection<T>(collection).doc(document).set(data);
  }

  async updateDocument(collection: string, document: string, data: Partial<T>): Promise<void> {
    return await this.firestore.collection<T>(collection).doc<T>(document).update(data);
  }

  async removeDocument(collection: string, document: string): Promise<void> {
    return await this.firestore.collection<T>(collection).doc(document).delete();
  }
}
