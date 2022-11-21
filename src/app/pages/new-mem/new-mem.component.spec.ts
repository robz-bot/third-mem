import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemComponent } from './new-mem.component';

describe('NewMemComponent', () => {
  let component: NewMemComponent;
  let fixture: ComponentFixture<NewMemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
