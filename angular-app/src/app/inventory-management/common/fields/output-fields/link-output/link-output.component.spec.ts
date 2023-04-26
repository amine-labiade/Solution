import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkOutputComponent } from './link-output.component';

describe('LinkOutputComponent', () => {
  let component: LinkOutputComponent;
  let fixture: ComponentFixture<LinkOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
