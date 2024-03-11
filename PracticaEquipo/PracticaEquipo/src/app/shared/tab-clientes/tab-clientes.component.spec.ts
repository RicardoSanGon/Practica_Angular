import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabClientesComponent } from './tab-clientes.component';

describe('TabClientesComponent', () => {
  let component: TabClientesComponent;
  let fixture: ComponentFixture<TabClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
