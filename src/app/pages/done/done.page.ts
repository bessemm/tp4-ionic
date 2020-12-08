import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit {
  allTasks = [] ;
  currentDate ='' ;
  currentUser =null ;
  constructor(private angularFire: AngularFireDatabase,private authService : AuthenticationService) { 
    const todayDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = todayDate.toLocaleDateString('en-en', options);
  }
  ngOnInit() {
    this.getTasks();
  }
  getTasks() {
    this.angularFire.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(data => {
      console.log(data)
      data.forEach(el => {
       if(el.payload.exportVal().checked && el.payload.exportVal().userId == this.getUserId()){
        this.allTasks.push({
          key: el.key,
          text: el.payload.exportVal().text,
          checked: el.payload.exportVal().checked,
          date: el.payload.exportVal().date.substring(11, 16)
        })
       }
      })

    })
  }
  changeCheckedState(task) {
    this.angularFire.object(`Tasks/${task.key}/checked`).set(true);
  }

  getUserId(){
    this.authService.user().subscribe(user => this.currentUser = user)
    return this.currentUser.uid;
  }
}
