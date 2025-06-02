import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProjetsComponent } from './dashboard-projets.component';

describe('DashboardProjetsComponent', () => {
  let component: DashboardProjetsComponent;
  let fixture: ComponentFixture<DashboardProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProjetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
