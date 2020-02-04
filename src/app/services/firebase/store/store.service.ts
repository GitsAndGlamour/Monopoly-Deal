import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import FieldPath = firebase.firestore.FieldPath;
import FieldValue = firebase.firestore.FieldValue;

export interface Clause {fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[] | boolean };

@Injectable({
  providedIn: 'root'
})
export class StoreService<T> {

  constructor(public firestore: AngularFirestore) { }

  async getId(collection: string): Promise<string> {
    try {
      const ref = await this.firestore.collection<T>(collection).ref;
      return ref.doc().id;
    } catch(error) {
      return null;
    }
  }

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

  async updateSubCollectionDocument(collection: string, document: string, subCollection: string, subDocument: string, data: any): Promise<void> {
    try {
      return await this.firestore.collection<T>(collection).doc<T>(document).collection(subCollection).doc(subDocument).update(data);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async addToArrayInDocument(collection: string, document: string, array: string, value: Partial<string | string[]>): Promise<void> {

    try {
      return await this.firestore.collection<T>(collection).doc<T>(document).update(
          {[array]: FieldValue.arrayUnion(value)} as unknown as Partial<T>
      );
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async removeFromArrayInDocument(collection: string, document: string, array: string, value: Partial<string | string[]>): Promise<void> {

    try {
      return await this.firestore.collection<T>(collection).doc<T>(document).update(
          {[array]: FieldValue.arrayRemove(value)} as unknown as Partial<T>
      );
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
