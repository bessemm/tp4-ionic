import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  nbreItem = 0 ;
  
  allTasks = []
   
  currentUser =null ;
  constructor(private angularFire: AngularFireDatabase,private authService : AuthenticationService,private router : Router) {
     
  }

  ngOnInit() {
    this.authService.user().subscribe(user =>{
      this.currentUser = user
      this.getTasks();
    } )
  }
  getTasks() {
    this.angularFire.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(data => {
      console.log(data)
      data.forEach(el => {
        if(!el.payload.exportVal().checked && el.payload.exportVal().userId == this.getUserId())
        {       

          this.nbreItem =  this.nbreItem + 1
        }
        this.allTasks.push({
          key: el.key,
          text: el.payload.exportVal().text,
          checked: el.payload.exportVal().checked,
          date: el.payload.exportVal().date.substring(11, 16)
        })
      })

    })
  }
  logout(){
    this.authService.logout().then(()=> {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    })
  }

  getUserId(){
    
    return this.currentUser.uid;
  }
}
