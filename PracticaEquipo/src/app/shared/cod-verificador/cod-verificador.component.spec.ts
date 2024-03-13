import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodVerificadorComponent } from './cod-verificador.component';

describe('CodVerificadorComponent', () => {
  let component: CodVerificadorComponent;
  let fixture: ComponentFixture<CodVerificadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodVerificadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodVerificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
