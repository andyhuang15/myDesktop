import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintTplComponent } from './print-tpl.component';

describe('PrintTplComponent', () => {
  let component: PrintTplComponent;
  let fixture: ComponentFixture<PrintTplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintTplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintTplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
