import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireOuvrierComponent } from './formulaire-ouvrier.component';

describe('FormulaireOuvrierComponent', () => {
  let component: FormulaireOuvrierComponent;
  let fixture: ComponentFixture<FormulaireOuvrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireOuvrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireOuvrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
