import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRapportsComponent } from './dashboard-rapports.component';

describe('DashboardRapportsComponent', () => {
  let component: DashboardRapportsComponent;
  let fixture: ComponentFixture<DashboardRapportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRapportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRapportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
