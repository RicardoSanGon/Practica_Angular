import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabLogComponent } from './tab-log.component';

describe('TabLogComponent', () => {
  let component: TabLogComponent;
  let fixture: ComponentFixture<TabLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
