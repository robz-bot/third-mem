import { Component, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-mobile-view-menus',
  templateUrl: './mobile-view-menus.component.html',
  styleUrls: ['./mobile-view-menus.component.css'],
})
export class MobileViewMenusComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MobileViewMenusComponent>,
    private authService: AuthenticationService
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  openLinkSignOut(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    this.authService.SignOut();
    event.preventDefault();
  }
}
