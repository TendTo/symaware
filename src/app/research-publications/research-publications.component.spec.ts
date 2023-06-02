import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchPublicationsComponent } from './research-publications.component';

describe('ResearchPublicationsComponent', () => {
  let component: ResearchPublicationsComponent;
  let fixture: ComponentFixture<ResearchPublicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResearchPublicationsComponent]
    });
    fixture = TestBed.createComponent(ResearchPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
