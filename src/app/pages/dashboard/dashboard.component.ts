import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs';
import { getStorage, ref, listAll } from 'firebase/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageService } from 'src/app/services/image.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
    private imageService: ImageService,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}
  filelist: any[] = [];
  newMemArray: any[] = [];
  ngOnInit(): void {
    const collectionRef = this.firestore.collection('new-mem');
    const collectionInstance = collectionRef.valueChanges();
    collectionInstance.subscribe((res: any) => {
      this.newMemArray = res;
      console.log(this.newMemArray)
    });

  //   const userData = JSON.parse(localStorage.getItem('user')!);
  //   const storage = getStorage();
  //   const ref = this.storage.ref('Team Lunch');
  //   ref.listAll().subscribe((data) => {
  //     for (let i = 0; i < data.items.length; i++) {
  //       console.log(data.items[i]);
  //       let fullPath = data.items[i].fullPath;
  //       let newref = this.storage
  //         .ref(fullPath)
  //         .getDownloadURL()
  //         .subscribe((data: any) => {
  //           console.log(data);
  //           this.filelist.push({
  //             name: fullPath,
  //             url: data,
  //           });
  //         });
  //     }
  //     console.log(this.filelist);
  //   });
  // }
  // imageList: any[] = [];
  // rowIndexArray: any[] = [];
  // collection: any;
  }
}
