/**
 * What to create a wrapper for firebase
 * 
 * 
 * 
 */

 /**
  * Set up constants with api key and client keys
  */

 import * as firebase from 'firebase';
//import console = require('console');

 // Initialize Firebase
 const firebaseConfig = {
   apiKey: "AIzaSyDZpTrKnBHgaQbv_F87VoD5ZOn83Rkqe-w",
   authDomain: "dindin-9954b.firebaseapp.com",
   databaseURL: "https://dindin-9954b.firebaseio.com",
   projectId: "dindin-9954b",
   storageBucket: "dindin-9954b.appspot.com",
   messagingSenderId: "1055947992772"
 };
 

 export default class firebaseWrapper{
 
    constructor(path, store){
        this.dataObject = null; 
        if (!firebase.apps.length){
          firebase.initializeApp(firebaseConfig)
        }
        this.StartListener(path, store)
        this.gotInformation = false;
    }
 

    getData(){
        return this.gotInformation ? this.dataObject : null
    }
 
    storeObject(property, value) {
        firebase.database().ref(this.path).set({
        property: value
        });
    }

    StartListener(path, store) {
    firebase.database().ref(path).on('value', (snapshot) => {
      this.dataObject = {...this.dataObject, ...snapshot.val()}
      this.gotInformation = true
      store.dispatch( {
        type: 'updater', 
        payload: snapshot.val()
      } )
      console.log(JSON.stringify(snapshot.val()))
    });
  }


 }