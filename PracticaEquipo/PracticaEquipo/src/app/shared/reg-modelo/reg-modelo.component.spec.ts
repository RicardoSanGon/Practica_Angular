import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegModeloComponent } from './reg-modelo.component';

describe('RegModeloComponent', () => {
  let component: RegModeloComponent;
  let fixture: ComponentFixture<RegModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
