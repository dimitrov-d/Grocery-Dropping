import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css'],
})
export class SavedComponent implements OnInit {

  saved_items: any;
  
  constructor(private db: AngularFirestore) {
    this.saved_items = this.db.collection('/saved').valueChanges();
    this.saved_items.subscribe((x) => console.log(x));
  }

  ngOnInit() {}
}
