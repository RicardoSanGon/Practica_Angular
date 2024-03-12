import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMarcasComponent } from './tab-marcas.component';

describe('TabMarcasComponent', () => {
  let component: TabMarcasComponent;
  let fixture: ComponentFixture<TabMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabMarcasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
