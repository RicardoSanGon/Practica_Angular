import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOrdenesComponent } from './tab-ordenes.component';

describe('TabOrdenesComponent', () => {
  let component: TabOrdenesComponent;
  let fixture: ComponentFixture<TabOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabOrdenesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
