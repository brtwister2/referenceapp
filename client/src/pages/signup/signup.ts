import { TabsPage } from '../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ReqServices } from "../../providers/reqservices";

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public frm:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, 
  public alertCtrl: AlertController, public req: ReqServices, public storage: Storage) {
  }

  signup(){

      let self = this;

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      })
      loading.present(); 

      this.req.signup(this.frm).then((result:any)=> {
        loading.dismiss();
        if(result.status){
            self.saveUserDataLocal(result.data);
            self.push();
        }else{
          self.alertCtrl.create({
            title:"Opps.",
            subTitle: 'This e-mail is already taken',
            buttons: ['OK']
          }).present();
        }
      }).catch((e) => {
        loading.dismiss();
        console.log(e);
        self.alertCtrl.create({
          title:"Opps.",
          subTitle: 'An error has occurred.',
          buttons: ['OK']
        }).present();  

    });
  }


  push() {
    this.navCtrl.push(TabsPage);
  }

  saveUserDataLocal(data){
    this.storage.ready().then(() => {
      this.storage.set('currentuser', data);
    });
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

}
