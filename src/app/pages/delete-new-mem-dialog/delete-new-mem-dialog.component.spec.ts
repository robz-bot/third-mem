import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNewMemDialogComponent } from './delete-new-mem-dialog.component';

describe('DeleteNewMemDialogComponent', () => {
  let component: DeleteNewMemDialogComponent;
  let fixture: ComponentFixture<DeleteNewMemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNewMemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteNewMemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
