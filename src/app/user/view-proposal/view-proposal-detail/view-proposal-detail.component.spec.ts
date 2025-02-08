import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProposalDetailComponent } from './view-proposal-detail.component';

describe('ViewProposalDetailComponent', () => {
  let component: ViewProposalDetailComponent;
  let fixture: ComponentFixture<ViewProposalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProposalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProposalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
