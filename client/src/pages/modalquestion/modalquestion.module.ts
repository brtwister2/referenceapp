import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalquestionPage } from './modalquestion';

@NgModule({
  declarations: [
    ModalquestionPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalquestionPage),
  ],
  exports: [
    ModalquestionPage
  ]
})
export class ModalquestionModule {}
