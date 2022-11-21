import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-mem-image-dialog',
  templateUrl: './new-mem-image-dialog.component.html',
  styleUrls: ['./new-mem-image-dialog.component.css'],
})
export class NewMemImageDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewMemImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    console.log(this.data)
  }
}
