import { ReferenceFrmPage } from '../referencefrm/referencefrm';
import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { AboutPage } from "../about/about";
import { NotificationsPage } from "../notifications/notifications";

import {ReqServices} from "../../providers/reqservices";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  feeds: any;

  constructor(public app: App, public req: ReqServices, public storage: Storage) {
    this.storage.ready().then(() => {
      storage.get('currentuser').then((user) => {
          if(user){
            req.getReferences(user.id, false).then(result => {
              this.feeds = result;
            });
          }
      });
    });
  }

  extractData(data){
    return JSON.parse(data);
  }

  pushNotifications(){
    this.app.getRootNav().push(NotificationsPage);
  }

  pushReferenceForm(data){
    this.app.getRootNav().push(ReferenceFrmPage, data);
  }

  pushAbout(user){
    this.app.getRootNav().push(AboutPage, user);
  }  

  generateStars = function(num) {
    return new Array(num);
  }

}
