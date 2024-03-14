import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabFaturacionComponent } from './tab-faturacion.component';

describe('TabFaturacionComponent', () => {
  let component: TabFaturacionComponent;
  let fixture: ComponentFixture<TabFaturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabFaturacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabFaturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
