import { ModalquestionPage } from '../pages/modalquestion/modalquestion';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { SearchPage } from '../pages/search/search';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CompaniesPage } from '../pages/companies/companies';
import { ReferenceFrmPage } from '../pages/referencefrm/referencefrm';
import { NotificationsPage } from '../pages/notifications/notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ReqServices } from '../providers/reqservices';
import { SearchCompanies, SearchUsers } from "../pipes/search";

import { IonicStorageModule } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '5bc2eec2'
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SearchPage,
    HomePage,
    LoginPage,
    SignupPage,
    CompaniesPage,
    ReferenceFrmPage,
    NotificationsPage,
    TabsPage,
    ModalquestionPage,

    SearchCompanies,
    SearchUsers
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SearchPage,
    HomePage,
    LoginPage,
    SignupPage,
    CompaniesPage,
    ReferenceFrmPage,
    NotificationsPage,
    ModalquestionPage,
    TabsPage,
  ],
  providers: [
    ReqServices,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
