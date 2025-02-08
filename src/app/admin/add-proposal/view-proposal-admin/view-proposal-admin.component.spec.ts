import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProposalAdminComponent } from './view-proposal-admin.component';

describe('ViewProposalAdminComponent', () => {
  let component: ViewProposalAdminComponent;
  let fixture: ComponentFixture<ViewProposalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProposalAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProposalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
