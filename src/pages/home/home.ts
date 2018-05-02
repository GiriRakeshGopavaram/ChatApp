import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private fcm: FCM, platform:Platform) {

    fcm.getToken().then(token => {
      // Your best bet is to here store the token on the user's profile on the
      // Firebase database, so that when you want to send notifications to this 
      // specific user you can do it from Cloud Functions.
      console.log("received token " + token);
      alert(token);
    });

    platform.ready().then(() => {
      fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          alert("Background");
          console.log("Background");
          //Notification was received on device tray and tapped by the user.
        } else {
          alert("foreground");
          console.log("foreground");
          //Notification was received in foreground. Maybe the user needs to be notified.
        }
      });
    });
//   this.fcm.subscribeToTopic('marketing');

// this.fcm.getToken().then(token => {
//   alert(token)
// });

// this.fcm.onNotification().subscribe(data => {
//   if(data.wasTapped){
//     console.log("Received in background");
//   } else {
//     console.log("Received in foreground");
//   };
// });

// this.fcm.onTokenRefresh().subscribe(token => {
//   alert(token)
// });

// this.fcm.unsubscribeFromTopic('marketing');
//   }
  }
}
