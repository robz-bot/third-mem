import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, map, Observable, startWith } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-new-mem',
  templateUrl: './new-mem.component.html',
  styleUrls: ['./new-mem.component.css'],
})
export class NewMemComponent implements OnInit {
  constructor(
    private storage: AngularFireStorage,
    private imageService: ImageService,
    private firestore: AngularFirestore,
    private snackBar: SnackbarService
  ) {}

  myControl = new FormControl('');
  options: string[] = [
    'Team Lunch',
    'Get-Together',
    'Birthday Celebration',
    'Others',
  ];
  filteredOptions: Observable<string[]> | undefined;

  imgSrc: string = '/assets/img/img_click.png';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  loader: boolean = false;

  userData: any;
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user')!);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  formTemplate = new FormGroup({
    date: new FormControl(''),
    occasion: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/img_click.png';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue: any) {
    this.isSubmitted = true;
    console.log(this.formTemplate);

    if (
      formValue.imageUrl == '' ||
      formValue.imageUrl == null ||
      formValue.imageUrl == undefined
    ) {
      this.snackBar.openSnackBar('Image is required!');
      return;
    }
    if (
      formValue.occasion == '' ||
      formValue.occasion == null ||
      formValue.occasion == undefined
    ) {
      this.snackBar.openSnackBar('Occasion is required!');
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

    // if (this.formTemplate.valid) {
    var filePath = `${formValue.occasion}/${this.selectedImage.name
      .split('.')
      .slice(0, -1)
      .join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.loader = true;
    this.storage
      .upload(filePath, this.selectedImage)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.imageService.insertImageDetails(formValue);
            //Saving other fields
            this.firestore
              .collection('new-mem')
              .add({
                occasion: formValue.occasion,
                date: formValue.date.toString(),
                image: url,
                createdBy: this.userData.uid,
                email: this.userData.email,
                id: this.firestore.createId(),
              })
              .then((res) => {
                this.loader = false;
                console.log(res);
                this.snackBar.openSnackBar('New Memory Pic Added!');
              })
              .catch((e) => {
                console.log(e);
              });
            this.resetForm();
          });
        })
      )
      .subscribe();
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      date: '',
      imageUrl: '',
      occasion: '',
    });
    this.imgSrc = '/assets/img/img_click.png';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
