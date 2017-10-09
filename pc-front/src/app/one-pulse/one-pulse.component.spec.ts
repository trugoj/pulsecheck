import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePulseComponent } from './one-pulse.component';

describe('OnePulseComponent', () => {
  let component: OnePulseComponent;
  let fixture: ComponentFixture<OnePulseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnePulseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
