import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegInventarioComponent } from './reg-inventario.component';

describe('RegInventarioComponent', () => {
  let component: RegInventarioComponent;
  let fixture: ComponentFixture<RegInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
