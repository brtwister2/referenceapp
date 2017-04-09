import { ModalquestionPage } from '../modalquestion/modalquestion';
import { ModalquestionModule } from '../modalquestion/modalquestion.module';
import { ReqServices } from '../../providers/reqservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-referencefrm',
  templateUrl: 'referencefrm.html',
})
export class ReferenceFrmPage {

  public switch:string = 'questionnaire';
  public questions:any = {};
  public currentUser:any;
  public refUserId:any;
  public serverloaded:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage: Storage, public loadingCtrl: LoadingController,
              public req: ReqServices, public alertCtrl: AlertController,
              public modalCtrl: ModalController) {
      
      if(navParams.data && navParams.data.id){
        this.serverloaded = true;
        this.questions = JSON.parse(navParams.data.data);      
      }

      this.refUserId = navParams.data.uid;
      
      this.storage.get('currentuser').then((data) => {
        if(data){
          this.currentUser = data;
        }
      });

  }

  extractData(data){
    return JSON.parse(data);
  }  

  openModal(){
    let profileModal = this.modalCtrl.create(ModalquestionPage);
    profileModal.onDidDismiss(result => {
      this.sendQuestionnaire(result);
    });
    profileModal.present();    
  }

  sendQuestionnaire(result){

      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 3000
      });
      loader.present();

      this.questions.message = result.comment; 
      this.questions.rating = result.rating;

      let send:any = {};
      send.data = JSON.stringify(this.questions);
      send.rating = this.questions.rating;
      send.userid = this.currentUser.id;
      send.refid = this.refUserId;

      console.log(this.questions);
      this.req.sendReferencesRequest(send).then((data)=> {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          subTitle: 'Reference sent successfully.',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
      });
        
  }

  generateStars = function(num) {
    return new Array(num);
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad Referencefrm');
  }

}
