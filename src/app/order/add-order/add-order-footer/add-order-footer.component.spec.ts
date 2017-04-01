import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderFooterComponent } from './add-order-footer.component';

describe('AddOrderFooterComponent', () => {
  let component: AddOrderFooterComponent;
  let fixture: ComponentFixture<AddOrderFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrderFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
