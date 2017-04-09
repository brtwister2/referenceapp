import { Component } from '@angular/core';
import {App, NavParams, AlertController} from 'ionic-angular';
import { CompaniesPage } from "../companies/companies";
import {ReqServices} from "../../providers/reqservices";
import {ReferenceFrmPage} from "../referencefrm/referencefrm";
import { Auth, User } from '@ionic/cloud-angular';

import { Storage } from '@ionic/storage';

import { TabsPage } from "../tabs/tabs";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  feeds: any;
  isMe: boolean = true;
  user: any = {};

  constructor(public app: App, public req: ReqServices, navParams: NavParams,
              public storage: Storage, public alertCtrl: AlertController) {

    if(navParams.data && navParams.data.id){
      this.isMe = false;
      this.user = navParams.data;
      console.log(this.user);
      this.req.getReferences(this.user.id, true).then(data => {
          this.feeds = data;
      });      
    }else{
      this.isMe = true;
      storage.get('currentuser').then((u) => {
          if(u){
            this.user = u;
            console.log(this.user);
            this.req.getReferences(this.user.id, true).then(data => {
                this.feeds = data;
            });
          }
      });
    }

  }

  extractData(data){
    return JSON.parse(data);
  }  

  requestReference(){
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'A notification will be sent to this user requesting it to write a reference form of you. Continue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Continue',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }  


  getTitle(){
    return this.isMe ? 'My Profile' : "About";
  }

  filesAdded(ev){
      console.log(ev);
  }

  logout(){

    let alert = this.alertCtrl.create({
      title: 'Confirm logout',
      message: 'Do you really want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {

            this.storage.ready().then(() => {
              this.storage.remove('currentuser');
              let nav = this.app.getRootNav();

              nav.setRoot(LoginPage);
            });
          }
        }
      ]
    });
    alert.present();

  }

  pushReferenceForm(data){
    this.app.getRootNav().push(ReferenceFrmPage, data);
  }

  pushAbout(user){
    this.app.getRootNav().push(AboutPage, user);
  }

  pushCompanies(){
    this.app.getRootNav().push(CompaniesPage, {});
  }

  generateStars = function(num) {
    let n = parseInt(num);
    return new Array(isNaN(n) ? 0 : n);
  }

}
