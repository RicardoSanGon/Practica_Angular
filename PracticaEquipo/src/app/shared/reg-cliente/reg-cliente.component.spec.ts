import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegClienteComponent } from './reg-cliente.component';

describe('RegClienteComponent', () => {
  let component: RegClienteComponent;
  let fixture: ComponentFixture<RegClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
