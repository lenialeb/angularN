import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatectCComponent } from './latect-c.component';

describe('LatectCComponent', () => {
  let component: LatectCComponent;
  let fixture: ComponentFixture<LatectCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatectCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatectCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
