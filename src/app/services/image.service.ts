import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable, shareReplay } from 'rxjs';
import { GalleryImage } from '../model/gallery-image';
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  imageDetailList: any = [];

  constructor(
    private firebase: AngularFireDatabase,
    private afs: AngularFireStorage
  ) {}

  imageList: any[] = [];
  rowIndexArray: any[] = [];
  resultArr: any[] = [];

  getImageDetailList() {
    this.imageDetailList = this.firebase
      .list('Team Lunch')
      .snapshotChanges()
      .subscribe((list: any) => {
        this.imageList = list.map((item: any) => {
          console.log(item);
          return item.payload.val();
        });
        this.rowIndexArray = Array.from(
          Array(Math.ceil((this.imageList.length + 1) / 3)).keys()
        );
      });
    console.log(this.imageList);
    console.log(this.rowIndexArray);
    // .collection<any>('/Get-Together')
    // .snapshotChanges()
    // .pipe(
    //   map((actions) =>
    //     console.log(actions)
    //   )
    // ).subscribe();

    return this.resultArr;
  }

  insertImageDetails(imageDetails: any) {
    this.imageDetailList.push(imageDetails);
  }
}
