import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstrationsComponent } from './demonstrations.component';

describe('DemonstrationsComponent', () => {
  let component: DemonstrationsComponent;
  let fixture: ComponentFixture<DemonstrationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemonstrationsComponent]
    });
    fixture = TestBed.createComponent(DemonstrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
