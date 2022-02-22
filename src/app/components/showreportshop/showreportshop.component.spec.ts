import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowreportshopComponent } from './showreportshop.component';

describe('ShowreportshopComponent', () => {
  let component: ShowreportshopComponent;
  let fixture: ComponentFixture<ShowreportshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowreportshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowreportshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
