import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MobileViewMenusComponent } from '../mobile-view-menus/mobile-view-menus.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private _bottomSheet: MatBottomSheet
  ) {}

  openMobileViewMenus(): void {
    this._bottomSheet.open(MobileViewMenusComponent);
  }
  userData: any;
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user')!);
  }
  showFiller: boolean = false;
  signOut() {
    this.authService.SignOut();
  }
}
