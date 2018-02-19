import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispFrameComponentComponent } from './disp-frame-component.component';

describe('DispFrameComponentComponent', () => {
  let component: DispFrameComponentComponent;
  let fixture: ComponentFixture<DispFrameComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispFrameComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispFrameComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
