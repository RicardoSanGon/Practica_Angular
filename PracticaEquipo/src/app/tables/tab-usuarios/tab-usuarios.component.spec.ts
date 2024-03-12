import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUsuariosComponent } from './tab-usuarios.component';

describe('TabUsuariosComponent', () => {
  let component: TabUsuariosComponent;
  let fixture: ComponentFixture<TabUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
