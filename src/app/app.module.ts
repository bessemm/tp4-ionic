import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule } from '@angular/fire/database';

 // Your web app's Firebase configuration
 export const firebaseConfig = {
  apiKey: "AIzaSyCaveqNMY-ED7Rq-77yQfxKvzS8w5FD5Qg",
  authDomain: "todo-ionic-tp.firebaseapp.com",
  projectId: "todo-ionic-tp",
  storageBucket: "todo-ionic-tp.appspot.com",
  messagingSenderId: "942944321850",
  appId: "1:942944321850:web:7d913ffd97b4be4689d003"
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),HttpClientModule, AppRoutingModule,
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
