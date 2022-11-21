import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-new-mem-dialog',
  templateUrl: './delete-new-mem-dialog.component.html',
  styleUrls: ['./delete-new-mem-dialog.component.css']
})
export class DeleteNewMemDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteNewMemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: AngularFirestore,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  collectionName: string = 'new-mem';
  deleteNewMem(){
    this.firestore.collection(this.collectionName).doc(this.data.id).delete();

  }
}
