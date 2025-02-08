import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskAdminComponent } from './view-task-admin.component';

describe('ViewTaskAdminComponent', () => {
  let component: ViewTaskAdminComponent;
  let fixture: ComponentFixture<ViewTaskAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTaskAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
