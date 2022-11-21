import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemImageDialogComponent } from './new-mem-image-dialog.component';

describe('NewMemImageDialogComponent', () => {
  let component: NewMemImageDialogComponent;
  let fixture: ComponentFixture<NewMemImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMemImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMemImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
