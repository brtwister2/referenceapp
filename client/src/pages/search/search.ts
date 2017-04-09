import {Component} from '@angular/core';
import {NavController , App} from 'ionic-angular';
import { AboutPage } from "../about/about";
import {ReqServices} from "../../providers/reqservices";

@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class SearchPage {

    public users: any;
    public term:string;

    constructor(public app: App, public req: ReqServices) {
        this.initializeItems();
    }

    initializeItems() {
        this.req.getUsers(null).then(data => {
            this.users = data;
        });
    }

    pushAbout(user){
        this.app.getRootNav().push(AboutPage, user);
    }

    onInput(ev) {
        this.initializeItems();
        this.term = ev.target.value;
    }

}
