import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import FieldPath = firebase.firestore.FieldPath;

export interface Clause {fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]};

@Injectable({
  providedIn: 'root'
})
export class StoreService<T> {

  constructor(private firestore: AngularFirestore) { }

  async getCollection(collection: string): Promise<T[]> {
    try {
      const ref = await this.firestore.collection<T>(collection).get().toPromise();
      return ref.docs.map<T>(doc => doc.data() as T);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getCollectionWhere(collection: string, clause: Clause): Promise<T[]> {
    try {
      const ref = await this.firestore.collection<T>(collection, ref => ref.where(clause.fieldPath, clause.opStr, clause.value))
          .get().toPromise();
      return ref.docs.map<T>(doc => doc.data() as T);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getDocument(collection: string, document: string): Promise<T> {
    try {
      const ref = await this.firestore.collection(collection).doc(document).get().toPromise();
      return ref.data() as T;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addDocument(collection: string, document: string, data: T): Promise<void> {
    try {
      console.log(collection, document, data);
      return await this.firestore.collection<T>(collection).doc(document).set(data);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async updateDocument(collection: string, document: string, data: Partial<T>): Promise<void> {
    try {
      return await this.firestore.collection<T>(collection).doc<T>(document).update(data);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async removeDocument(collection: string, document: string): Promise<void> {
    try {
      return await this.firestore.collection<T>(collection).doc(document).delete();
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
