import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage  implements OnInit {


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
        this.allTasks.push({
          key: el.key,
          text: el.payload.exportVal().text,
          checked: el.payload.exportVal().checked,
          date: el.payload.exportVal().date.substring(11, 16)
        })
      })

    })
  }
  addNewTask() {
    console.log(this.newTask);
    this.angularFire.list('Tasks/').push({
      text: this.newTask
      , date: new Date().toISOString(),
      checked: false,
      userId : this.getUserId()
    });
    this.newTask = ''
  }
  getUserId(){
     this.authService.user().subscribe(user =>  user.uid)
  }
  changeCheckedState(task) {
    this.angularFire.object(`Tasks/${task.key}/checked`).set(task.checked);
  }
  showForm() {
    this.addTask = !this.addTask;
    this.newTask = '';
  }
 
}
