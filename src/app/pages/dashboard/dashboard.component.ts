import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs';
import { getStorage, ref, listAll } from 'firebase/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageService } from 'src/app/services/image.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteNewMemDialogComponent } from '../delete-new-mem-dialog/delete-new-mem-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private firestore: AngularFirestore,public dialog: MatDialog
  ) {}
  displayedColumns: string[] = [
    'Id',
    'eventName',
    'Date',
    'Location',
    'CreatedBy',
    'Options',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userData: any;
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user')!);}

  ngAfterViewInit() {
    this.getAllDocs()
  }

  newEventArray: any[] = [];
  collectionName: string = 'events';
  getAllDocs() {
    const collectionRef = this.firestore.collection(this.collectionName);

    collectionRef.snapshotChanges().subscribe(
      (res: any) => {
        this.newEventArray = res.map((e: any) => {
          console.log(e);
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          console.log(data);
          return data;
        });

        this.dataSource = new MatTableDataSource(this.newEventArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        //console.log('Error in fetching results');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteNewMemDialogComponent, {
      width: '500px',
      data: {
        id: id,
        deleteFor: 'event',
        deleteForTitle: 'Delete Event',
        deleteForDesc: 'Would you like to delete this Event?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log('Deleted');
      console.log(result);
      this.getAllDocs()
    });
  }
}
