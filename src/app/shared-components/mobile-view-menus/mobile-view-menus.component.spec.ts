import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileViewMenusComponent } from './mobile-view-menus.component';

describe('MobileViewMenusComponent', () => {
  let component: MobileViewMenusComponent;
  let fixture: ComponentFixture<MobileViewMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileViewMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileViewMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
