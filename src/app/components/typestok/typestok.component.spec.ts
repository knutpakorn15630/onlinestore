import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypestokComponent } from './typestok.component';

describe('TypestokComponent', () => {
  let component: TypestokComponent;
  let fixture: ComponentFixture<TypestokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypestokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypestokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
