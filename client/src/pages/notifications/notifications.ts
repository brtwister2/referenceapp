import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {ReqServices} from "../../providers/reqservices";
import {ReferenceFrmPage} from "../referencefrm/referencefrm";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  public notifications: any;

  constructor(public navCtrl: NavController, public storage: Storage, public req: ReqServices) {

    storage.get('currentuser').then((user) => {
        if(user){
          req.getReferencesRequest(1).then(data => {
            this.notifications = data;
          });
        }
    });

  }

  pushReferenceForm(uid){
    this.navCtrl.push(ReferenceFrmPage, {uid: uid});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Notifications');
  }

}
