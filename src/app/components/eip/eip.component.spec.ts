import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EipComponent } from './eip.component';

describe('EipComponent', () => {
  let component: EipComponent;
  let fixture: ComponentFixture<EipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
