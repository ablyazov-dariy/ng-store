import { Component, inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngStore';

  afs = inject(AngularFirestore);

  ngOnInit(): void {
    this.afs
      .collection('products', ref => {
        return ref;
      })
      .valueChanges({ idField: 'id' })
      .subscribe(console.log);
  }
}
