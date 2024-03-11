import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRolesComponent } from './tab-roles.component';

describe('TabRolesComponent', () => {
  let component: TabRolesComponent;
  let fixture: ComponentFixture<TabRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabRolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
