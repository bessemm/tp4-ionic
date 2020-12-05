import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire'
import {AngularFireDatabaseModule } from '@angular/fire/database'
 // Your web app's Firebase configuration
 export var firebaseConfig = {
  apiKey: "AIzaSyCfoafpS5fz_WqCQ_1wRUhZvhcntYI08HA",
  authDomain: "todo-ionic-app-cc754.firebaseapp.com",
  projectId: "todo-ionic-app-cc754",
  storageBucket: "todo-ionic-app-cc754.appspot.com",
  messagingSenderId: "840785937280",
  appId: "1:840785937280:web:7377547fefc74ec857f765"
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
     AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
