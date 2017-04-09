import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReferenceFrmPage } from './referencefrm';

@NgModule({
  declarations: [
    ReferenceFrmPage,
  ],
  imports: [
    IonicPageModule.forChild(ReferenceFrmPage),
  ],
  exports: [
    ReferenceFrmPage
  ]
})
export class ReferencefrmModule {}
