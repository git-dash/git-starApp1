import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBookComponent } from './confirm-book.component';

describe('ConfirmBookComponent', () => {
  let component: ConfirmBookComponent;
  let fixture: ComponentFixture<ConfirmBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
