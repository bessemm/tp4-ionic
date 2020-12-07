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
  apiKey: "AIzaSyD80Mwh-MkavQii1E1oQtmtwcKVgqmOw8o",
  authDomain: "todo-7efef.firebaseapp.com",
  projectId: "todo-7efef",
  storageBucket: "todo-7efef.appspot.com",
  messagingSenderId: "51910457730",
  appId: "1:51910457730:web:cade82f1f351b03e30b79b"
}
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
