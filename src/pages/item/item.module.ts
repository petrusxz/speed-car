import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemPage } from './item';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemPage),
    DirectivesModule
  ]
})
export class ItemPageModule {}
