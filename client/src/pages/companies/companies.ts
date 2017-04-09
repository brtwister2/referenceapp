import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ReqServices} from "../../providers/reqservices";

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-companies',
    templateUrl: 'companies.html'
})
export class CompaniesPage {

    public companies:any = [];
    companiesListRadio:any;
    term: string = '';
    currentUser:any;
    

    constructor(public navCtrl:NavController, public req: ReqServices,public storage: Storage) {
      storage.get('currentuser').then((u) => {
          if(u){
            this.currentUser = u;
            this.companiesListRadio = u.ucname;
          }
      });
    }

    save(){
        this.currentUser.ucname = this.companiesListRadio;
        this.storage.set('currentuser', this.currentUser);
        this.navCtrl.pop();
    }

    ngOnInit() {
      this.initializeItems();
    }

    selectCompany(ucname){
        console.log(ucname);
    }

    initializeItems() {
        this.req.getCompanies().then(data => {
            this.companies = data;
        });
    }

    onInput(ev) {
      this.initializeItems();
      this.term = ev.target.value;
    }

}
