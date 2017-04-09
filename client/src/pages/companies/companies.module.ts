import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompaniesPage } from './companies';

@NgModule({
  declarations: [
    CompaniesPage,
  ],
  imports: [
    IonicPageModule.forChild(CompaniesPage),
  ],
  exports: [
    CompaniesPage
  ]
})
export class CompaniesModule {}
