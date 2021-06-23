import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPointComponent } from './new-point.component';

describe('NewPointComponent', () => {
  let component: NewPointComponent;
  let fixture: ComponentFixture<NewPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
