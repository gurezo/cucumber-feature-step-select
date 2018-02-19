import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispItemComponentComponent } from './disp-item-component.component';

describe('DispItemComponentComponent', () => {
  let component: DispItemComponentComponent;
  let fixture: ComponentFixture<DispItemComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispItemComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
