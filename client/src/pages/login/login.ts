import { ReqServices } from '../../providers/reqservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { SignupPage } from '../signup/signup';
import {TabsPage} from "../tabs/tabs";

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loading: any;
  public login: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,  private loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public storage: Storage, public auth: Auth, public user: User, public req: ReqServices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  pushSignUp(){
    this.navCtrl.push(SignupPage);
  }

  public attempLoginLinkedIn() {
    this.showLoading();
    this.auth.login('linkedin').then((data) =>{

      let usr = { linkedintoken: null, linkedinid: null, name: null, email: null, picture: null };

      usr.linkedinid = this.user.social.linkedin.uid;
      usr.name = this.user.social.linkedin.data.full_name;
      usr.email = this.user.social.linkedin.data.email;
      usr.picture = this.user.social.linkedin.data.profile_picture;

      console.log(usr);
      console.log(JSON.stringify(usr));

      let self = this;
      this.req.authenticate(usr).then(function(user:any){
        self.saveUserDataLocal(user.data);
        self.loading.dismiss();
        self.navCtrl.setRoot(TabsPage);        
      });
    });
  }

  public attempLogin() {
    let self = this;
    this.showLoading();   
    this.req.authenticate(this.login).then(function(result:any){
      if(result.status){
        self.saveUserDataLocal(result.data);
        self.loading.dismiss();
        self.navCtrl.setRoot(TabsPage);
      }else{
        self.alertCtrl.create({
          title:"Opps.",
          subTitle: 'We could not locate this user.',
          buttons: ['OK']
        }).present();       
        self.loading.dismiss();
      }
    }).catch((e) => {
        console.log(e);
        self.alertCtrl.create({
          title:"Opps.",
          subTitle: 'An error has occurred.',
          buttons: ['OK']
        }).present();        

        self.loading.dismiss();      

    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  saveUserDataLocal(data){
    this.storage.ready().then(() => {
      this.storage.set('currentuser', data);
    });
  }

}
