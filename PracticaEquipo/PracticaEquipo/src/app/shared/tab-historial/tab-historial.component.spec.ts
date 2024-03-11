import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabHistorialComponent } from './tab-historial.component';

describe('TabHistorialComponent', () => {
  let component: TabHistorialComponent;
  let fixture: ComponentFixture<TabHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabHistorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
