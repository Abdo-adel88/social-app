import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPostComponent } from './popup-post.component';

describe('PopupPostComponent', () => {
  let component: PopupPostComponent;
  let fixture: ComponentFixture<PopupPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
