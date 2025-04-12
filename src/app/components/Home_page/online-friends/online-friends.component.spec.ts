import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineFriendsComponent } from './online-friends.component';

describe('OnlineFriendsComponent', () => {
  let component: OnlineFriendsComponent;
  let fixture: ComponentFixture<OnlineFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineFriendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
