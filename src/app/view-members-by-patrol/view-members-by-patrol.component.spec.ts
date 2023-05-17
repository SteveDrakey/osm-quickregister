import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMembersByPatrolComponent } from './view-members-by-patrol.component';

describe('ViewMembersByPatrolComponent', () => {
  let component: ViewMembersByPatrolComponent;
  let fixture: ComponentFixture<ViewMembersByPatrolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMembersByPatrolComponent]
    });
    fixture = TestBed.createComponent(ViewMembersByPatrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
