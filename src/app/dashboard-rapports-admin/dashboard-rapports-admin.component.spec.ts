import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRapportsAdminComponent } from './dashboard-rapports-admin.component';

describe('DashboardRapportsAdminComponent', () => {
  let component: DashboardRapportsAdminComponent;
  let fixture: ComponentFixture<DashboardRapportsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRapportsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRapportsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
