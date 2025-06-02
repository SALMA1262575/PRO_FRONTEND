import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSousTraitantsComponent } from './dashboard-sous-traitants.component';

describe('DashboardSousTraitantsComponent', () => {
  let component: DashboardSousTraitantsComponent;
  let fixture: ComponentFixture<DashboardSousTraitantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSousTraitantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSousTraitantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
