import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSuperviseurComponent } from './dashboard-superviseur.component';

describe('DashboardSuperviseurComponent', () => {
  let component: DashboardSuperviseurComponent;
  let fixture: ComponentFixture<DashboardSuperviseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSuperviseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSuperviseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
