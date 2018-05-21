import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { ItemModel } from '../../models/item.model';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {

  private itemParams: ItemModel;
  private item: ItemModel = new ItemModel();
  private itemsCollection: AngularFirestoreCollection<ItemModel>;
  private itemDoc: AngularFirestoreDocument<ItemModel>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private sanitizer: DomSanitizer
  ) { }

  ionViewDidLoad(): void {
    this.itemParams = this.navParams.get('item');
    if (this.itemParams) this.item = this.itemParams;
  }

  openFileChooser(event: any): void {
    const file = event.target.files[0];
    if (file.type.includes('image')) this.fileToBase64(file);
  }

  fileToBase64(file: any): void {
    let reader = new FileReader();

    reader.onload = e => {
      let base64 = reader.result;
      
      this.item.picture = base64;
    };

    reader.readAsDataURL(file);
  }

  saveItem(item: ItemModel): void {
    if (!item.id) {
      this.item.id = this.afs.createId();
      this.itemsCollection = this.afs.collection<ItemModel>('items');
      this.itemsCollection
        .doc(this.item.id)
        .set(Object.assign({}, this.item))
        .then(() => {
          this.navCtrl.pop();
        });
    } else {
      this.itemDoc = this.afs.doc<ItemModel>(`items/${this.item.id}`);
      this.itemDoc.update(Object.assign({}, this.item));
      this.navCtrl.pop();
    }
  }
}
