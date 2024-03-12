import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegMarcaComponent } from './reg-marca.component';

describe('RegMarcaComponent', () => {
  let component: RegMarcaComponent;
  let fixture: ComponentFixture<RegMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegMarcaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
