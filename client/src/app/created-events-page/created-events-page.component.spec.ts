import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedEventsPageComponent } from './created-events-page.component';

describe('CreatedEventsPageComponent', () => {
  let component: CreatedEventsPageComponent;
  let fixture: ComponentFixture<CreatedEventsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatedEventsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatedEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
