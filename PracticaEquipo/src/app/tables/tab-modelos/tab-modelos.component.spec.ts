import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabModelosComponent } from './tab-modelos.component';

describe('TabModelosComponent', () => {
  let component: TabModelosComponent;
  let fixture: ComponentFixture<TabModelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabModelosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
