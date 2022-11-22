import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ImageDetailComponent } from './pages/image-detail/image-detail.component';
import { UploadComponent } from './pages/upload/upload.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthenticationService } from './services/authentication.service';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSnackBar,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from './services/snackbar.service';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NewMemComponent } from './pages/new-mem/new-mem.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { SecDatePipe } from './pipes/sec-date.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DeleteNewMemDialogComponent } from './pages/delete-new-mem-dialog/delete-new-mem-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewMemImageDialogComponent } from './pages/new-mem-image-dialog/new-mem-image-dialog.component';
import { EventsComponent } from './pages/events/events.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MobileViewMenusComponent } from './shared-components/mobile-view-menus/mobile-view-menus.component';
@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    ImageDetailComponent,
    UploadComponent,
    HeaderComponent,
    FooterComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    NewMemComponent,
    VerifyEmailComponent,
    SecDatePipe,
    DeleteNewMemDialogComponent,
    NewMemImageDialogComponent,
    EventsComponent,
    MobileViewMenusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgbModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatListModule,
  ],
  providers: [
    AuthenticationService,
    SnackbarService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
