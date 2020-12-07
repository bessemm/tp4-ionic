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
  currentDate: string;
  newTask: string = '';
  allTasks = []
  addTask: boolean = false;
  constructor(private angularFire: AngularFireDatabase,private authService : AuthenticationService,private router : Router) {
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
        if(!el.payload.exportVal().checked)
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
}
