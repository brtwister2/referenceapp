import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReqServices {

    host:string = "http://192.168.0.9/refapp";

    constructor(public http:Http) {
        console.log('Hello Services Provider');
    }

    // Users

    authenticate(data){

        return new Promise(resolve => {
          this.http.post(this.host + '/login', data )
            .subscribe(data => {
                resolve(data.json());
            });
        });
        //return this.getCurrentUser(null);
    }

    signup(data){

        return new Promise(resolve => {
          this.http.post(this.host + '/signup', data )
            .subscribe(data => {
                resolve(data.json());
            });
        });
        //return this.getCurrentUser(null);
    }    

    getCurrentUser(id){
      //GET https://refappdashboard.herokuapp.com/api/people/1102
        id = 1102;
        return new Promise(resolve => {
          this.http.get(/*this.host + '/people/' + id*/ 'assets/mock/server-people1102.json')
            .subscribe(data => {
              resolve(data.json());
            });
        });      
    }    

    getUsers(id) {
        return new Promise(resolve => {
          this.http.get(/*this.host + '/users/' + id*/ (id ? 'assets/mock/getuserme.json' : 'assets/mock/getusers.json'))
            .subscribe(data => {
              resolve(data.json());
            });
        });
    }

    signUpUser(data) {
        return new Promise(resolve => {
          this.http.get(/*this.host + '/users/' + id*/ 'assets/mock/signup.json')
            .subscribe(data => {
              resolve(data.json());
            });
        });
    }    

    getFeed(id, toprates) {
        return new Promise(resolve => {
          this.http.get(/*this.host + '/feed/' + id*/ (!toprates ? 'assets/mock/feeds.json' : 'assets/mock/feedstoprates.json'))
            .subscribe(data => {
              resolve(data.json());
            });
        });
    }

    // Companies
    getCompanies() {
        return new Promise(resolve => {
          this.http.get(this.host + '/companies')
            .subscribe(data => {
              if(data.json().status)
                resolve(data.json().data);
              else
                resolve(null);
            });
        });
    }

    // References
    getReferences(id, toprates) {
        return new Promise(resolve => {
          this.http.get(this.host + '/ref/' + id)
            .subscribe(data => {
              if(data.json().status)
                resolve(data.json().data);
              else
                resolve(null);
            });
        });
    }    
    getReferencesRequest(id) {
        return new Promise(resolve => {
          this.http.get(this.host + '/refreq/' + id)
            .subscribe(data => {
              if(data.json().status)
                resolve(data.json().data);
              else
                resolve(null);
            });
        });
    }

    sendReferencesRequest(data) {
      return new Promise(resolve => {
        this.http.post(this.host + '/ref', data)
          .subscribe(data => {
            resolve(data.json());
          });
      });      
    }

}
