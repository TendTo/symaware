import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EicPathfinderChallengeComponent } from './eic-pathfinder-challenge.component';

describe('EicPathfinderChallengeComponent', () => {
  let component: EicPathfinderChallengeComponent;
  let fixture: ComponentFixture<EicPathfinderChallengeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EicPathfinderChallengeComponent]
    });
    fixture = TestBed.createComponent(EicPathfinderChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
