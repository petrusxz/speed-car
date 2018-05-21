import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import firebase from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { ItemModel } from '../../models/item.model';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private itemCollection: AngularFirestoreCollection<ItemModel>;
  private itemDoc: AngularFirestoreDocument<ItemModel>;
  items: Observable<ItemModel[]>;

  constructor(
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore
  ) { }

  ionViewDidLoad(): void {
    this.retrievePromotions();
  }

  async retrievePromotions(): Promise<void> {
    try {
      await this.afAuth.auth.signInAnonymously();
      this.itemCollection = this.afs.collection<ItemModel>('items');
      this.items = this.itemCollection.valueChanges();
    } catch (error) {
      console.error(error);
    }
  }
}
