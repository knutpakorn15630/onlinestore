import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminshopComponent } from './adminshop.component';

describe('AdminshopComponent', () => {
  let component: AdminshopComponent;
  let fixture: ComponentFixture<AdminshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
