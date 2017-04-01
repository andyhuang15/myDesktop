import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleOrderComponent } from './settle-order.component';

describe('SettleOrderComponent', () => {
  let component: SettleOrderComponent;
  let fixture: ComponentFixture<SettleOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettleOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
