import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOrdenDetalleComponent } from './tab-orden-detalle.component';

describe('TabOrdenDetalleComponent', () => {
  let component: TabOrdenDetalleComponent;
  let fixture: ComponentFixture<TabOrdenDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabOrdenDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabOrdenDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
