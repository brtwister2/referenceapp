import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the Modalquestion page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modalquestion',
  templateUrl: 'modalquestion.html',
})
export class ModalquestionPage {

  public starcvar:any;
  public comment:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController) {
  }

  starc(c){
    this.starcvar = c;
  }

 dismiss() {
   let data = { 'comment': this.comment, 'rating': this.starcvar };
   this.viewCtrl.dismiss(data);
 }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad Modalquestion');
  }

}
