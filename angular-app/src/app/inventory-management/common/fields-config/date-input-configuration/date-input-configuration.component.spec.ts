import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputConfigurationComponent } from './date-input-configuration.component';

describe('DateInputConfigurationComponent', () => {
  let component: DateInputConfigurationComponent;
  let fixture: ComponentFixture<DateInputConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateInputConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInputConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
