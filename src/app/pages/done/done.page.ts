import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit {
  allTasks = []
  constructor(private angularFire: AngularFireDatabase) { }
  ngOnInit() {
    this.getTasks();
  }
  getTasks() {
    this.angularFire.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(data => {
      console.log(data)
      data.forEach(el => {
       if(el.payload.exportVal().checked){
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

}
