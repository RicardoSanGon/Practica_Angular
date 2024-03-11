import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegProveedorComponent } from './reg-proveedor.component';

describe('RegProveedorComponent', () => {
  let component: RegProveedorComponent;
  let fixture: ComponentFixture<RegProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegProveedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
