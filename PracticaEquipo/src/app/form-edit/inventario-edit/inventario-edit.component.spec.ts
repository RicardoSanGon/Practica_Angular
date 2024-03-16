import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioEditComponent } from './inventario-edit.component';

describe('InventarioEditComponent', () => {
  let component: InventarioEditComponent;
  let fixture: ComponentFixture<InventarioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
