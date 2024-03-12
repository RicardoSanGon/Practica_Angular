import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCatalogoComponent } from './tab-catalogo.component';

describe('TabCatalogoComponent', () => {
  let component: TabCatalogoComponent;
  let fixture: ComponentFixture<TabCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabCatalogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
