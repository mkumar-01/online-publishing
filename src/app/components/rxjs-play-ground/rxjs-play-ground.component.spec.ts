import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsPlayGroundComponent } from './rxjs-play-ground.component';

describe('RxjsPlayGroundComponent', () => {
  let component: RxjsPlayGroundComponent;
  let fixture: ComponentFixture<RxjsPlayGroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsPlayGroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsPlayGroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
