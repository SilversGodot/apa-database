import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointListViewComponent } from './point-list-view.component';

describe('PointViewComponent', () => {
  let component: PointListViewComponent;
  let fixture: ComponentFixture<PointListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
