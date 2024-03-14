import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabFacturaComponent } from './tab-factura.component';

describe('TabFacturaComponent', () => {
  let component: TabFacturaComponent;
  let fixture: ComponentFixture<TabFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabFacturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
