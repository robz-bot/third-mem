import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { GalleryImage } from 'src/app/model/gallery-image';
import { ImageService } from 'src/app/services/image.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DeleteNewMemDialogComponent } from '../delete-new-mem-dialog/delete-new-mem-dialog.component';
import { NewMemImageDialogComponent } from '../new-mem-image-dialog/new-mem-image-dialog.component';
class mem {
  'id': string;
  'image': string;
  'occasion': string;
  'date': string;
}
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  images: Observable<GalleryImage[]> | undefined;
  constructor(
    private imageService: ImageService,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) {}
  newMemArray: any[] = [];
  displayedColumns: string[] = [
    'image',
    'postedby',
    'date',
    'occasion',
    'location',
    'buttons',
  ];
  dataSource!: MatTableDataSource<any>;
  collectionName: string = 'new-mem';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  userData:any
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user')!);
    console.log(this.userData)
  }

  ngAfterViewInit() {
    this.getAllDocs();
  }

  getAllDocs() {
    const collectionRef = this.firestore.collection(this.collectionName);

    collectionRef.snapshotChanges().subscribe(
      (res: any) => {
        this.newMemArray = res.map((e: any) => {
          console.log(e);
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          console.log(data);
          return data;
        });

        this.dataSource = new MatTableDataSource(this.newMemArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        //console.log('Error in fetching results');
      }
    );
  }

  applyFilter(event: Event) {
    console.log(event.target);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  downloadImage(item: any) {
    console.log(item.image);
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteNewMemDialogComponent, {
      width: '500px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log('Deleted');
      console.log(result);
    });
  }

  OpenImageDialog(item: any) {
    const dialogRef = this.dialog.open(NewMemImageDialogComponent, {
      data: { item: item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteMem(id: string) {
    //console.log('Delete ID: ' + this.collectionName + '/' + id);
    this.firestore.collection(this.collectionName).doc(id).delete();
    this.getAllDocs();
  }
}
