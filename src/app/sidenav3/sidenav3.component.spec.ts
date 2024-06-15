import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidenav3Component } from './sidenav3.component';

describe('Sidenav3Component', () => {
  let component: Sidenav3Component;
  let fixture: ComponentFixture<Sidenav3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Sidenav3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Sidenav3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
