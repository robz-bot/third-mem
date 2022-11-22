import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  constructor(
    private storage: AngularFireStorage,
    private imageService: ImageService,
    private firestore: AngularFirestore,
    private snackBar: SnackbarService
  ) {}

  formTemplate = new FormGroup({
    eventName: new FormControl(''),
    date: new FormControl(''),
    occasion: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
  });
  loader: boolean = false;
  filteredOptions: Observable<string[]> | undefined;
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user')!);
  }
  myControl = new FormControl('');
  userData: any;
  onSubmit(formValue: any) {
    console.log(this.formTemplate);

    if (
      formValue.eventName == '' ||
      formValue.eventName == null ||
      formValue.eventName == undefined
    ) {
      this.snackBar.openSnackBar('Event Name is required!');
      return;
    }
    if (
      formValue.date == '' ||
      formValue.date == null ||
      formValue.date == undefined
    ) {
      this.snackBar.openSnackBar('Date is required!');
      return;
    }
    if (
      formValue.location == '' ||
      formValue.location == null ||
      formValue.location == undefined
    ) {
      this.snackBar.openSnackBar('Location is required!');
      return;
    }
    if (
      formValue.description == '' ||
      formValue.description == null ||
      formValue.description == undefined
    ) {
      this.snackBar.openSnackBar('Description is required!');
      return;
    }

    //Saving other fields
    this.firestore
      .collection('events')
      .add({
        eventName: formValue.eventName,
        date: formValue.date.toString(),
        createdBy: this.userData.uid,
        email: this.userData.email,
        id: this.firestore.createId(),
        description: formValue.description,
        location: formValue.location,
      })
      .then((res: any) => {
        this.loader = false;
        console.log(res);
        this.snackBar.openSnackBar('New Event Added!');
      })
      .catch((e: any) => {
        console.log(e);
      });
    this.resetForm();
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      eventName: '',
      occasion: '',
      description: '',
      location: '',
      date: '',
    });
  }
}
