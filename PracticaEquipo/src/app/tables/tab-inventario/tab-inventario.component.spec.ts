import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabInventarioComponent } from './tab-inventario.component';

describe('TabInventarioComponent', () => {
  let component: TabInventarioComponent;
  let fixture: ComponentFixture<TabInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
